package lk.vsc.controller;

import lk.vsc.DTO.DocumentDto;
import lk.vsc.DTO.PrintServiceJobDTO;
import lk.vsc.DTO.ServiceInvoiceDTO;
import lk.vsc.DTO.ServicesDTO;
import lk.vsc.entity.ServiceJob;
import lk.vsc.entity.ServiceJobDetails;
import lk.vsc.entity.Services;
import lk.vsc.service.ServiceJobService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/ServiceJobController")
public class ServiceJobController {

    private final String SERVICE_REPORT_FILE_NAME = System.getProperty("user.home") + "/src/ServiceReportNew_1.jasper.jasper";

    @Autowired
    private ServiceJobService serviceJobService;
    private String outputFile;

    @PostMapping(value = "/addServiceJob")
    public DocumentDto addServiceJob(@RequestBody ServicesDTO serviceJob) {

        ServiceJob s3 = serviceJob.getServiceOrder();
        List<ServiceJobDetails> j1 = serviceJob.getServiceJobDetails();
        String s = serviceJobService.addServiceJobs(s3, j1);
        if (s.length() != 0) {
            DocumentDto d = createJasperReport(serviceJob);
            return d;
        } else {
            return null;
        }

    }


    @GetMapping(value = "/sendMessageToCustomer/{phoneNumber}/{password}/{accountName}")
    public String getItems(@PathVariable String phoneNumber, @PathVariable String password, @PathVariable String accountName) {

        String msg = "Dear valuable customer, we started servicing your vehicle. -TurismoAuto";
        String number = "94" + phoneNumber.substring(1);

        URL textit = null;
        try {
            textit = new URL("http://textit.biz/sendmsg/index.php?id="+accountName+"&pw="+password+"&to="+number +"&text=Dear valuable customer, we started servicing your vehicle. -TurismoAuto");
            BufferedReader in = new BufferedReader(new InputStreamReader(textit.openStream()));
            String inputLine;
            while ((inputLine = in.readLine()) != null)
                System.out.println(inputLine);
            in.close();


        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
return "0";
    }

    public static String getCurrentDate() {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date();
        String newDate = dateFormat.format(date);
        return newDate;
    }

    /*-------------------Generate Current Time -----------------*/
    public static String getCurrentTime() {

        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("HH-mm-ss");

        return (sdf.format(cal.getTime()));

    }

    public DocumentDto createJasperReport(ServicesDTO serviceJob) {

        ServiceInvoiceDTO v1 = serviceJob.getServiceInvoice();
        System.out.println(v1);
        ArrayList<Services> v2 = v1.getServices();
        ArrayList<PrintServiceJobDTO> v3 = new ArrayList<>();
        for (Services s : v1.getServices()) {
            PrintServiceJobDTO p1 = new PrintServiceJobDTO();
            p1.setServiceId(s.getServiceId());
            p1.setServiceDescription(s.getServiceDesc());
            p1.setServiceName(s.getServiceName());
            p1.setVehicletype(s.getVehicletype());
            v3.add(p1);
        }

        /* Convert List to JRBeanCollectionDataSource */
        JRBeanCollectionDataSource itemsJRBean = new JRBeanCollectionDataSource(v3);

        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("servicesDataSource", itemsJRBean);
        parameters.put("invoiceNumber", v1.getInvoiceNumber());
        parameters.put("vehicleNumber", v1.getVehicleNumber());
        parameters.put("chasisNumber", v1.getChasisNumber());
        parameters.put("make", v1.getMake());
        parameters.put("year", v1.getYear());
        parameters.put("model", v1.getModel());
        parameters.put("customerName", "Mr. " + v1.getCustomerName());
        parameters.put("customerPhoneNumber", v1.getCustomerPhoneNumber());
        parameters.put("customerAddress", v1.getCustomerAddress());
        parameters.put("presentOdoMeters", v1.getPresentOdoMeter() + " KM");
        // DecimalFormat df = new DecimalFormat("0.00");
        //  String price = df.format(v1.getTotal());
        //   parameters.put("total", price);

        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "Service_Bill.pdf";

        //  outputFile = userHomeDirectory + File.separatorChar + "src/" + fileName;
        outputFile = userHomeDirectory + File.separatorChar + "Documents/" + fileName;


        ClassLoader classLoader = new ServiceJobController().getClass().getClassLoader();

        //get the file from resources
        //File file = new File(classLoader.getResource(SERVICE_REPORT_FILE_NAME).getFile());


//        /* Using compiled version(.jasper) of Jasper report to generate PDF */
        String bytes = null;
        JasperPrint jasperPrint;
        try {

            //  jasperPrint = JasperFillManager.fillReport(SERVICE_REPORT_FILE_NAME, parameters, new JREmptyDataSource());
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/ServiceReport.jasper", parameters, new JREmptyDataSource());

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
