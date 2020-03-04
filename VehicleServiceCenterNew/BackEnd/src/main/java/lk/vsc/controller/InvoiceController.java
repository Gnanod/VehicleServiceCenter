package lk.vsc.controller;


import lk.vsc.DTO.*;
import lk.vsc.entity.PerformaInvoice;
import lk.vsc.entity.ServiceJob;
import lk.vsc.service.PerformaInvoiceService;
import lk.vsc.service.ServiceJobService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/InvoiceController")
public class InvoiceController {

    @Autowired
    private ServiceJobService serviceJobService;
    @Autowired
    private PerformaInvoiceService performaInvoiceService;
    private String outputFile;
    @PostMapping(value = "/preformaInvoicePrint")
    public DocumentDto preformaInvoicePrint(@RequestBody JobCloseDTO jobCloseDto) {


        DocumentDto d = printInvoice(jobCloseDto);
        return d;


    }

    private DocumentDto printInvoice(JobCloseDTO jobCloseDto) {

        List<JobCloseServiceDetailsDTO> services = jobCloseDto.getServices();
        List<JobCloseItemDetailsDTO> jobCloseItem = jobCloseDto.getJobCloseItem();

        ArrayList<InvoiceServiceDTO> i1 = new ArrayList<InvoiceServiceDTO>();
        ArrayList<InvoiceItemsDTO> i2 = new ArrayList<InvoiceItemsDTO>();

        DecimalFormat df = new DecimalFormat("0.00");

        for ( JobCloseServiceDetailsDTO j1: services ) {

            InvoiceServiceDTO d1 = new InvoiceServiceDTO();
            d1.setServiceDesc(j1.getServiceDesc());
            d1.setServiceName(j1.getServiceName());
            String price = df.format(j1.getServicePrice());
            d1.setServicePrice(price);
            i1.add(d1);
        }

        for (JobCloseItemDetailsDTO j2:jobCloseItem
             ) {
            InvoiceItemsDTO d2 = new InvoiceItemsDTO();

            d2.setItemName(j2.getItemName());
            String price = df.format(j2.getQtyPrice());
            d2.setPrice(price);
            String qtyType = j2.getQtyType();
            if(qtyType.equals("Cans")){
                if(j2.getQty()==1){
                    d2.setQty(j2.getQty()+" Can");
                }else{
                    d2.setQty(j2.getQty()+" Cans");
                }

            }else if(qtyType.equals("liters")){
                d2.setQty(j2.getQty()+" Liters");
            }else if(qtyType.equals("Units")){
                d2.setQty(Double.toString(j2.getQty()));
            }
            i2.add(d2);
        }
        JRBeanCollectionDataSource serviceDetail = new JRBeanCollectionDataSource(i1);
        JRBeanCollectionDataSource itemDetails = new JRBeanCollectionDataSource(i2);

        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("serviceDetail", serviceDetail);
        parameters.put("itemDetails", itemDetails);
        parameters.put("date", getCurrentDate());
        parameters.put("serviceTotal", jobCloseDto.getServiceTotal());
        parameters.put("itemTotal", jobCloseDto.getItemTotal());
        double grossAmount = Double.parseDouble(jobCloseDto.getServiceTotal()) + Double.parseDouble(jobCloseDto.getItemTotal());
        String amount = df.format(grossAmount);
        System.out.println("gross Amount"+amount);
        parameters.put("grossAmount", amount);
        parameters.put("jobNo", jobCloseDto.getJobNo());
        ServiceJob getDetails  =  serviceJobService.getSserviceJob(jobCloseDto.getJobNo());
        System.out.println(getDetails.getServiceJobId());
        System.out.println(getDetails.getServiceJobId());
        parameters.put("vehicleNumber", getDetails.getVehicle().getVehicleNumber());
        parameters.put("chasisNumber", getDetails.getVehicle().getEngineNumber());
        parameters.put("make", getDetails.getVehicle().getVehicleMake());
        parameters.put("year", getDetails.getVehicle().getYearOfManufacture());
        parameters.put("model", getDetails.getVehicle().getVehicleModel());
        parameters.put("customerName", "Mr. "+getDetails.getVehicle().getCustomer().getFirstName()+" "+getDetails.getVehicle().getCustomer().getFirstName());
        parameters.put("phoneNumber", getDetails.getVehicle().getCustomer().getPhoneNumber());
        parameters.put("address", getDetails.getVehicle().getCustomer().getAddress());
        parameters.put("presentOdoMeter",getDetails.getPresentOdoMeter()+" KM");
        parameters.put("invoiceNum",generatePerformaInvoiceId());

        String userHomeDirectory = System.getProperty("user.home");
        String fileName ="PerformaInvoice_"+jobCloseDto.getJobNo()+".pdf";

        outputFile = userHomeDirectory + File.separatorChar + "Documents/" + fileName;

        ClassLoader classLoader = new ServiceJobController().getClass().getClassLoader();

        String bytes = null;
        JasperPrint jasperPrint;
        try {

            //  jasperPrint = JasperFillManager.fillReport(SERVICE_REPORT_FILE_NAME, parameters, new JREmptyDataSource());
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/performaInvoice.jasper", parameters, new JREmptyDataSource());

            /* outputStream to create PDF */
            OutputStream outputStream = new FileOutputStream(new File(outputFile));
            /* Write content to PDF file */
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);


            File f = new File(outputFile);
            bytes = downloadPdf(f);

            savePerformaInvoice(jobCloseDto.getJobNo(),jobCloseDto.getItemTotal(),jobCloseDto.getServiceTotal(),grossAmount);


        } catch (JRException e) {

            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        DocumentDto d = new DocumentDto();
        d.setPdf(bytes);
        return d;
    }

    private void savePerformaInvoice(String jobNo, String itemTotal, String serviceTotal, double grossAmount) {

        PerformaInvoice i = new PerformaInvoice();
        i.setGrossAmount(grossAmount);
        String performaLastId =generatePerformaInvoiceId();
        i.setPerformaInvoiceId(performaLastId);
        i.setItemAmount(Double.parseDouble(itemTotal));
        i.setServiceAmount(Double.parseDouble(serviceTotal));
        i.setServiceId(jobNo);

        performaInvoiceService.addPerformaInvoice(i);
    }

    public static String getCurrentDate() {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String newDate = dateFormat.format(date);
        return newDate;
    }

    public String downloadPdf(File crunchifyFile) throws IOException {
        FileInputStream crunchifyInputStream = null;
        byte[] crunchifyByteStream = new byte[(int) crunchifyFile.length()];
        try {
            crunchifyInputStream = new FileInputStream(crunchifyFile);
            crunchifyInputStream.read(crunchifyByteStream);
            crunchifyInputStream.close();
            for (int counter = 0; counter < crunchifyByteStream.length; counter++) {
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String s = Base64.getEncoder().encodeToString(crunchifyByteStream);
        return s;
    }


    public String generatePerformaInvoiceId(){


        String lastId = performaInvoiceService.getResult();
        ServiceJob s1 = new ServiceJob();
        String finalId=" ";
        if (lastId != null) {

            String subid = lastId.substring(5);
            int id = Integer.parseInt(subid);
            id++;
            NumberFormat numberFormat = NumberFormat.getIntegerInstance();
            numberFormat.setMinimumIntegerDigits(4);
            numberFormat.setGroupingUsed(false);
            String newID = "P"+getCurrentYear()+numberFormat.format(id);
            finalId= newID;
            s1.setServiceJobId(newID);

        } else {

            finalId="P"+getCurrentYear()+"0001";
//            s1.setServiceJobId("P"+getCurrentYear()+"0001");
        }

        return finalId;
    }

    public static String getCurrentYear() {

        DateFormat dateFormat = new SimpleDateFormat("yyyy");
        Date date = new Date();
        String newDate = dateFormat.format(date);
        return newDate;
    }

}
