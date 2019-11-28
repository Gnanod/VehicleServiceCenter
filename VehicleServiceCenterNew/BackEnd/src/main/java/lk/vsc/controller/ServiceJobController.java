package lk.vsc.controller;

import lk.vsc.DTO.DocumentDto;
import lk.vsc.DTO.ServiceInvoiceDTO;
import lk.vsc.DTO.ServicesDTO;
import lk.vsc.entity.Services;
import lk.vsc.service.ServiceJobService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/ServiceJobController")
public class ServiceJobController {


    @Autowired
    private ServiceJobService serviceJobService;
    private String outputFile;

    @PostMapping(value = "/addServiceJob")
    public DocumentDto addItem(@RequestBody ServicesDTO serviceJob) {

        String s = serviceJobService.addServiceJob(serviceJob.getServiceOrder());
        if (s.length() != 0) {
            DocumentDto d= createJasperReport(serviceJob);
            return d;
        } else {
            return null;
        }

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
        ArrayList<Services> v2 = v1.getServices();

        /* Convert List to JRBeanCollectionDataSource */
        JRBeanCollectionDataSource itemsJRBean = new JRBeanCollectionDataSource(v2);

        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("servicesDataSource", itemsJRBean);
        parameters.put("invoiceNumber", v1.getInvoiceNumber());
        parameters.put("vehicleNumber", v1.getVehicleNumber());
        parameters.put("chasisNumber", v1.getChasisNumber());
        parameters.put("make", v1.getMake());
        parameters.put("year", v1.getYear());
        parameters.put("model", v1.getModel());
        parameters.put("customerName", v1.getCustomerName());
        parameters.put("customerPhoneNumber", v1.getCustomerPhoneNumber());
        parameters.put("customerAddress", v1.getCustomerAddress());
        parameters.put("total", Double.toString(v1.getTotal()));

        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "Service_Bill_" + getCurrentDate() + "_" + getCurrentTime() + ".pdf";

        outputFile = userHomeDirectory + File.separatorChar + "Documents/" + fileName;

//        /* Using compiled version(.jasper) of Jasper report to generate PDF */
        String bytes = null;
        JasperPrint jasperPrint;
        try {


            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/main/java/lk/vsc/jasper/ServiceReport.jasper", parameters, new JREmptyDataSource());

            /* outputStream to create PDF */
            OutputStream outputStream = new FileOutputStream(new File(outputFile));
            /* Write content to PDF file */
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

            System.out.println("File Generated: " + outputFile);

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



    public String  downloadPdf(File crunchifyFile) throws IOException {
        FileInputStream crunchifyInputStream = null;
        byte[] crunchifyByteStream = new byte[(int) crunchifyFile.length()];
        try {
            crunchifyInputStream = new FileInputStream(crunchifyFile);
            crunchifyInputStream.read(crunchifyByteStream);
            crunchifyInputStream.close();
            for (int counter = 0; counter < crunchifyByteStream.length; counter++) {
                System.out.print((char) crunchifyByteStream[counter]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        String s = Base64.getEncoder().encodeToString(crunchifyByteStream);
        return  s;
    }

}
