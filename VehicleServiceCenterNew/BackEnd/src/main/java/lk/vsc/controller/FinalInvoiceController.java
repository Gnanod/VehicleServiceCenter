package lk.vsc.controller;

import lk.vsc.DTO.DocumentDto;
import lk.vsc.entity.FinalInvoice;
import lk.vsc.entity.FinalInvoicePayment;
import lk.vsc.entity.ServiceJob;
import lk.vsc.service.FinalInvoiceService;
import lk.vsc.service.ServiceJobService;
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
@RequestMapping(value = "/FinalInvoiceController")
public class FinalInvoiceController {

    @Autowired
    private FinalInvoiceService finalInvoiceService;
    private String outputFile;
    private DecimalFormat df = new DecimalFormat("0.00");


    @Autowired
    private ServiceJobService serviceJobService;

    @PostMapping(value = "/addFinalInvoice")
    public DocumentDto addFinalInvoice(@RequestBody FinalInvoice invoice){

        String s= finalInvoiceService.addFinalInvoice(invoice);
        if (s != null) {
//            String bytes =printBill(jobOrder);
            DocumentDto d = createJasperReport(invoice);
//            d.setPdf(bytes);
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

    private DocumentDto createJasperReport(FinalInvoice invoice) {

        if(invoice.getServiceDiscount()!=0 && invoice.getItemDiscount() !=0){
            System.out.println("Invoice One");
           return  printInvoiceOne(invoice);

        }else if(invoice.getServiceDiscount()!=0 && invoice.getItemDiscount() ==0 ){
            System.out.println("Invoice Two");
            return  printInvoiceTwo(invoice);
        }else if(invoice.getServiceDiscount()==0 && invoice.getItemDiscount() !=0){
            System.out.println("Invoice  Three");
            return  printInvoiceOneThree(invoice);
        }else if(invoice.getGrossDiscount() !=0) {
            System.out.println("DFour");
            return printInvoiceFour(invoice);
        }else if(invoice.getServiceDiscount()==0 && invoice.getItemDiscount() ==0 && invoice.getGrossDiscount() ==0){

            return printInvoiceFive(invoice);
        }else{
            return null;
        }

    }

    private DocumentDto printInvoiceFive(FinalInvoice invoice) {

        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("date", getCurrentDate());
        parameters.put("labourAmount", df.format(invoice.getServiceAmount()));
        parameters.put("itemAmount", df.format(invoice.getItemAmount()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        parameters.put("labourDiscount", df.format(invoice.getServiceDiscount()));
        parameters.put("itemDiscount", df.format(invoice.getItemDiscount()));
        parameters.put("grossDiscount", df.format(invoice.getGrossDiscount()));
        parameters.put("discountedLabour", df.format(invoice.getDiscountedTotalService()));
        parameters.put("discountedItemAmount", df.format(invoice.getDiscountedTotalItems()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        double total = invoice.getServiceAmount() + invoice.getItemAmount();
        System.out.println("Total"+total);
        parameters.put("grossAmount1",df.format(total) );
        parameters.put("jobNo", invoice.getServiceId());
        ServiceJob getDetails  =  serviceJobService.getSserviceJob(invoice.getServiceId());
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
        List<FinalInvoicePayment> f1 = invoice.getFinalInvoicePayments();
        FinalInvoicePayment f2 = new FinalInvoicePayment();
        for (FinalInvoicePayment f3:f1
        ) {
            f2.setPayment(f3.getPayment());
        }
        parameters.put("paidAmount",df.format(f2.getPayment()));
        System.out.println("Paid Amount "+f2.getPayment());
        parameters.put("creditBalance", df.format(total-f2.getPayment()));
        System.out.println("f2.getPayment()  "+f2.getPayment());
        System.out.println("total  "+total);

        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "finalInvoice.pdf";
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
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/finalInvoiceFive.jasper", parameters, new JREmptyDataSource());

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

    private DocumentDto printInvoiceFour(FinalInvoice invoice) {
        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("date", getCurrentDate());
        parameters.put("labourAmount", df.format(invoice.getServiceAmount()));
        parameters.put("itemAmount", df.format(invoice.getItemAmount()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        parameters.put("labourDiscount", df.format(invoice.getServiceDiscount()));
        parameters.put("itemDiscount", df.format(invoice.getItemDiscount()));
        parameters.put("grossDiscount", df.format(invoice.getGrossDiscount()));
        parameters.put("discountedLabour", df.format(invoice.getDiscountedTotalService()));
        parameters.put("discountedItemAmount", df.format(invoice.getDiscountedTotalItems()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        double total = invoice.getDiscountedTotalGross();
        System.out.println("Total"+total);
        parameters.put("grossAmount1",df.format(total) );
        parameters.put("jobNo", invoice.getServiceId());
        ServiceJob getDetails  =  serviceJobService.getSserviceJob(invoice.getServiceId());
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
        List<FinalInvoicePayment> f1 = invoice.getFinalInvoicePayments();
        FinalInvoicePayment f2 = new FinalInvoicePayment();
        for (FinalInvoicePayment f3:f1
        ) {
            f2.setPayment(f3.getPayment());
        }
        parameters.put("paidAmount",df.format(f2.getPayment()));
        System.out.println("Paid Amount "+f2.getPayment());
        parameters.put("creditBalance", df.format(total-f2.getPayment()));
        System.out.println("f2.getPayment()  "+f2.getPayment());
        System.out.println("total  "+total);

        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "finalInvoice.pdf";
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
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/finalInvoiceFour.jasper", parameters, new JREmptyDataSource());

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

    private DocumentDto printInvoiceOneThree(FinalInvoice invoice) {
        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("date", getCurrentDate());
        parameters.put("labourAmount", df.format(invoice.getServiceAmount()));
        parameters.put("itemAmount", df.format(invoice.getItemAmount()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        parameters.put("labourDiscount", df.format(invoice.getServiceDiscount()));
        parameters.put("itemDiscount", df.format(invoice.getItemDiscount()));
        parameters.put("discountedLabour", df.format(invoice.getDiscountedTotalService()));
        parameters.put("discountedItemAmount", df.format(invoice.getDiscountedTotalItems()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        System.out.println("invoice.getServiceAmount() :::::::"+invoice.getServiceAmount());
        System.out.println("invoice.getDiscountedTotalItems()::::::::"+invoice.getDiscountedTotalItems());
        double total = invoice.getServiceAmount() + invoice.getDiscountedTotalItems();
        parameters.put("grossAmount1",df.format(total) );
        parameters.put("jobNo", invoice.getServiceId());
        ServiceJob getDetails  =  serviceJobService.getSserviceJob(invoice.getServiceId());
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
        List<FinalInvoicePayment> f1 = invoice.getFinalInvoicePayments();
        FinalInvoicePayment f2 = new FinalInvoicePayment();
        for (FinalInvoicePayment f3:f1
        ) {
            f2.setPayment(f3.getPayment());
        }
        parameters.put("paidAmount",df.format(f2.getPayment() ) );
        parameters.put("creditBalance", df.format(total-f2.getPayment()));


        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "finalInvoice.pdf";
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
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/finalInvoiceThree.jasper", parameters, new JREmptyDataSource());

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


    public DocumentDto printInvoiceOne(FinalInvoice invoice){

        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("date", getCurrentDate());
        parameters.put("labourAmount", df.format(invoice.getServiceAmount()));
        parameters.put("itemAmount", df.format(invoice.getItemAmount()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        parameters.put("labourDiscount", df.format(invoice.getServiceDiscount()));
        parameters.put("itemDiscount", df.format(invoice.getItemDiscount()));
        parameters.put("discountedLabour", df.format(invoice.getDiscountedTotalService()));
        parameters.put("discountedItemAmount", df.format(invoice.getDiscountedTotalItems()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        double total = invoice.getDiscountedTotalService() + invoice.getDiscountedTotalItems();
        parameters.put("grossAmount1",df.format(total) );
        parameters.put("jobNo", invoice.getServiceId());
        ServiceJob getDetails  =  serviceJobService.getSserviceJob(invoice.getServiceId());
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
        List<FinalInvoicePayment> f1 = invoice.getFinalInvoicePayments();
        FinalInvoicePayment f2 = new FinalInvoicePayment();
        for (FinalInvoicePayment f3:f1
        ) {
            f2.setPayment(f3.getPayment());
        }
        parameters.put("paidAmount",df.format(f2.getPayment() ) );
        parameters.put("creditBalance", df.format(total-f2.getPayment()));


        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "finalInvoice.pdf";
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
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/finalInvoiceOne.jasper", parameters, new JREmptyDataSource());

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

    public DocumentDto printInvoiceTwo(FinalInvoice invoice){

        /* Map to hold Jasper report Parameters */
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("date", getCurrentDate());
        parameters.put("labourAmount", df.format(invoice.getServiceAmount()));
        parameters.put("itemAmount", df.format(invoice.getItemAmount()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        parameters.put("labourDiscount", df.format(invoice.getServiceDiscount()));
        parameters.put("itemDiscount", df.format(invoice.getItemDiscount()));
        parameters.put("discountedLabour", df.format(invoice.getDiscountedTotalService()));
        parameters.put("discountedItemAmount", df.format(invoice.getDiscountedTotalItems()));
        parameters.put("grossAmount", df.format(invoice.getGrossAmount()));
        double total = invoice.getDiscountedTotalService() + invoice.getItemAmount();
        parameters.put("grossAmount1",df.format(total) );
        parameters.put("jobNo", invoice.getServiceId());
        ServiceJob getDetails  =  serviceJobService.getSserviceJob(invoice.getServiceId());
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
        List<FinalInvoicePayment> f1 = invoice.getFinalInvoicePayments();
        FinalInvoicePayment f2 = new FinalInvoicePayment();
        for (FinalInvoicePayment f3:f1
        ) {
            f2.setPayment(f3.getPayment());
        }
        parameters.put("paidAmount",df.format(f2.getPayment() ) );
        parameters.put("creditBalance", df.format(total-f2.getPayment()));


        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "finalInvoice.pdf";
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
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/finalInvoiceTwo.jasper", parameters, new JREmptyDataSource());

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
