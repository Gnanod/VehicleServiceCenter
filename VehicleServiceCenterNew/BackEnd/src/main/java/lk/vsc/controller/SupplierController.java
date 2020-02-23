package lk.vsc.controller;

import lk.vsc.DTO.DocumentDto;
import lk.vsc.DTO.UpdateJobPrice;
import lk.vsc.entity.ServiceJob;
import lk.vsc.entity.Supplier;
import lk.vsc.service.ServiceJobService;
import lk.vsc.service.SupplierService;
import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "SupplierController")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;
    @Autowired
    private ServiceJobService serviceJobService;
    private String outputFile;

    @PostMapping(value = "addSupplier")
    public Supplier addSupplier(@RequestBody Supplier supplier){

        return supplierService.addSupplier(supplier);

    }

    @DeleteMapping("/deleteSupplier/{id}")
    public void deleteSupplier(@PathVariable int id){

        supplierService.deleteSupplier(id);

    }



    @GetMapping(value = "/searchBySupplierName/{searchSupplierName}")
    public List<Supplier> searchBySupplierNumber(@PathVariable String searchSupplierName){
        return supplierService.searchBySupplierName(searchSupplierName);
    }

    @GetMapping(value ="/getAllSupplier")
    public List<Supplier> getAllVehicle(){

        return supplierService.getAllSupplier();
    }



    @GetMapping(value = "/getSuppliersNames/{supplierCompany}")
    public List<Supplier> getSupplierNames(@PathVariable String supplierCompany){
        return supplierService.getSupplierNames(supplierCompany);
    }

    @PostMapping(value = "/updateSupplier")
    public Supplier updateSupplier(@RequestBody Supplier supplier){

        return supplierService.updateSupplier(supplier);

    }

    @GetMapping(value ="/searchServiceDetailsByNumber/{serviceId}")
    public UpdateJobPrice searchServiceDetailsByNumber(@PathVariable String serviceId){

        return supplierService.searchServiceDetailsByNumber(serviceId);
    }

    @PostMapping(value = "updateSupplierPayments")
    public DocumentDto updateSupplierPayments(@RequestBody UpdateJobPrice u){

        String s= supplierService.updateSupplierPayments(u);

        if(s!=null){
            DocumentDto d = printInvoice(u);
            return d;
        }else{
            return null;
        }



    }

    private DocumentDto printInvoice(UpdateJobPrice jobCloseDto) {



        DecimalFormat df = new DecimalFormat("0.00");
        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();

        parameters.put("date", getCurrentDate());
//        double grossAmount = Double.parseDouble(jobCloseDto.getServiceTotal()) + Double.parseDouble(jobCloseDto.getItemTotal());

        parameters.put("grossAmount1",df.format(jobCloseDto.getGrossAmount()));
        parameters.put("jobNo", jobCloseDto.getService_id());
        parameters.put("paidAmount",df.format(jobCloseDto.getPayAmount()) );
        parameters.put("creditBalance", df.format(jobCloseDto.getCreditBalance()));

        ServiceJob getDetails  =  serviceJobService.getSserviceJob(jobCloseDto.getService_id());
        parameters.put("vehicleNumber", getDetails.getVehicle().getVehicleNumber());
        parameters.put("chasisNumber", getDetails.getVehicle().getEngineNumber());
        parameters.put("make", getDetails.getVehicle().getVehicleMake());
        parameters.put("year", getDetails.getVehicle().getYearOfManufacture());
        parameters.put("model", getDetails.getVehicle().getVehicleModel());
        parameters.put("customerName", "Mr. "+getDetails.getVehicle().getCustomer().getFirstName()+" "+getDetails.getVehicle().getCustomer().getFirstName());
        parameters.put("phoneNumber", getDetails.getVehicle().getCustomer().getPhoneNumber());
        parameters.put("address", getDetails.getVehicle().getCustomer().getAddress());
        parameters.put("presentOdoMeter",getDetails.getPresentOdoMeter()+" KM");
        parameters.put("previousPaidAmount",df.format(jobCloseDto.getPreviousCreditBalance()));

        String userHomeDirectory = System.getProperty("user.home");
        String fileName ="UpdateFinalInvoice_"+jobCloseDto.getService_id()+".pdf";

        outputFile = userHomeDirectory + File.separatorChar + "Documents/" + fileName;

        ClassLoader classLoader = new ServiceJobController().getClass().getClassLoader();

        String bytes = null;
        JasperPrint jasperPrint;
        try {

            //  jasperPrint = JasperFillManager.fillReport(SERVICE_REPORT_FILE_NAME, parameters, new JREmptyDataSource());
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/UpdatefinalInvoice.jasper", parameters, new JREmptyDataSource());

            /* outputStream to create PDF */
            OutputStream outputStream = new FileOutputStream(new File(outputFile));
            /* Write content to PDF file */
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);


            File f = new File(outputFile);
            bytes = downloadPdf(f);
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

}
