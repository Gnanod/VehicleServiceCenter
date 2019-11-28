package lk.vsc.controller;

import lk.vsc.DTO.*;
import lk.vsc.entity.*;
import lk.vsc.repository.ServiceJobRepository;
import lk.vsc.service.JobOrderService;
import lk.vsc.service.ServicesService;
import lk.vsc.service.VehicleService;
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
@RequestMapping(value = "/JobOrderController")
public class JobOrderController {

    private String outputFile;
    @Autowired
    private JobOrderService jobOrderService;
    @Autowired
    private VehicleService vehicleService;


    @Autowired
    private ServicesService servicesService1;

    @Autowired
    private ServiceJobRepository serviceJobRepository;

    @GetMapping(value = "/getItemsForJobOrder/{itemName}/{makeName}/{modelName}")
    public List<Item> getItemsForJobOrder(@PathVariable String itemName, @PathVariable String makeName, @PathVariable String modelName) {

        return jobOrderService.getItemsForJobOrder(itemName, makeName, modelName);

    }

    @GetMapping(value = "/getServiceDesc/{insertSelectedService}")
    public List<Services> getServiceDesc(@PathVariable String insertSelectedService) {

        List<Services> l1 = servicesService1.getServiceDesc(insertSelectedService);
        for (Services l : l1
        ) {

            System.out.println("Service Name :" + l.getServiceDesc());
            // System.out.println();
        }
        //System.out.println("GGGGG"+insertSelectedService);
        return l1;

    }

    @GetMapping(value = "/getTotalSales")
    public double getTotalSales() {

        return jobOrderService.getTotalSales();

    }


    @GetMapping(value = "/serchPreviousJobs/{vehicleId}")
    public JobOrder serchPreviousJobs(@PathVariable String vehicleId) {

        return jobOrderService.serchPreviousJobs(vehicleId);

    }

    @GetMapping(value = "/print/{serviceJob}")
    public JobOrder print(@PathVariable ServicesDTO serviceJob) {

        return null;

    }

    @PostMapping(value = "/downloadJobOrder")
    public DocumentDto DownloadJobOrder(@RequestBody ServicesDTO serviceJob){

        Map<String, Object> parameters = new HashMap<String, Object>();
        ServiceInvoiceDTO v1 = serviceJob.getServiceInvoice();
        System.out.println("v1.getInvoiceNumber()" + v1.getVehicleNumber());
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
        String fileName = "First_Service_Bill_" + getCurrentDate() + "_" + getCurrentTime() + ".pdf";
        outputFile = userHomeDirectory + File.separatorChar + "Documents/" + fileName;


        PrintJobOrder j1 = new PrintJobOrder();
        j1.setDate(getCurrentDate() );
        j1.setServiceJobId(v1.getInvoiceNumber());
        j1.setTime(getCurrentTime());
        j1.setVehicleNumber(v1.getVehicleNumber());
        String s1 = jobOrderService.printJobOrder(j1);
//        byte[] bytes=null;
        String bytes = null;
        if(s1!=null) {

            JasperPrint jasperPrint;
            try {
                jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/main/java/lk/vsc/jasper/Blank_A4.jasper", parameters, new JREmptyDataSource());
                /* outputStream to create PDF */
                OutputStream outputStream = new FileOutputStream(new File(outputFile));
                /* Write content to PDF file */
                JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

                System.out.println("File Generated: " + outputFile);

                File f = new File(outputFile);
                bytes = downloadPdf(f);
                //System.out.println("Bytes form Length"+bytes.length);
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

        }else{

            return null;
        }

    }

    @GetMapping(value = "/getMonthlyTotalSales")
    public double getMonthlyTotalSales() {

        return jobOrderService.getMonthlyTotalSales();

    }

    @GetMapping(value = "/getTodayJobCount")
    public double getTodayJobCount() {

        return jobOrderService.getTodayJobCount();

    }

    @GetMapping(value = "/searchUnitPrice/{itemName}")
    public Item searchUnitPrice(@PathVariable String itemName) {

        return jobOrderService.searchUnitPrice(itemName);

    }


    @GetMapping(value = "/getDetailsAccordingToServiceId/{id}")
    public VehicleCustomerDTO getDetailsAccordingToServiceId(@PathVariable String id) {

        // Object[] detailsAccordingToServiceId = serviceJobRepository.getDetailsAccordingToServiceId(id);

        String arr[] = jobOrderService.getDetailsAccordingToServiceId(id);
        if (arr != null) {


            Vehicle v1 = vehicleService.searchByVehicleId(Integer.parseInt(arr[0]));

            VehicleCustomerDTO v = new VehicleCustomerDTO();
            v.setChassisNumber(v1.getEngineNumber());
            v.setVehicleId(arr[0]);
            v.setCustomerEmail(v1.getCustomer().getEmail());
            v.setCustomerName(v1.getCustomer().getFirstName() + v1.getCustomer().getLastName());
            v.setCustomerAddress(v1.getCustomer().getAddress());
            v.setCustomerPhone(v1.getCustomer().getPhoneNumber());
            v.setMake(v1.getVehicleMake());
            v.setModel(v1.getVehicleModel());
            v.setYear(v1.getYearOfManufacture());
            v.setVehicleNumber(v1.getVehicleNumber());
            v.setServiceTotal(Double.parseDouble(arr[1]));

            return v;
        } else {
            return null;
        }


    }


    @PostMapping(value = "/addJobOrder")
    public String addItem(@RequestBody JobOrderDTO jobOrder) {

        JobOrder j1 = jobOrder.getJobOrder();

        List<JobOrderItemDetails> s3 = new ArrayList<>();

        List<JobOrderItemDetails> s1 = jobOrder.getJobOrderItemDetailsArray();
        List<JobOrderItemDetails> s2 = jobOrder.getJobOrderItemDetailsArray1();
        for (JobOrderItemDetails i : s1) {

            JobOrderItemDetails j2 = new JobOrderItemDetails();
            j2.setItem(i.getItem());
            j2.setQty(i.getQty());
            j2.setMake(i.getMake());
            j2.setModel(i.getModel());
            j2.setPrice(i.getPrice());
            j2.setLubeJobType(i.getLubeJobType());
            s3.add(j2);
        }
//
        for (JobOrderItemDetails i2 : s2) {

            JobOrderItemDetails j3 = new JobOrderItemDetails();
            j3.setItem(i2.getItem());
            j3.setQty(i2.getQty());
            j3.setMake(i2.getMake());
            j3.setModel(i2.getModel());
            j3.setPrice(i2.getPrice());
            j3.setLubeJobType(i2.getLubeJobType());


            s3.add(j3);
        }

        j1.setJobOrderItemDetails(s3);

        String s = jobOrderService.setJobOrder(j1);

        if (s != null) {
            printBill(jobOrder);
            return s;
        } else {
            return null;
        }


    }


    public void printBill(JobOrderDTO jt) {

        JobOrder jobOrder = jt.getJobOrder();
        List<JobOrderItemDetails> lubejob = jt.getJobOrderItemDetailsArray();
        List<JobOrderItemDetails> detailJob = jt.getJobOrderItemDetailsArray1();

        ArrayList<JobOrderItemDetailsDTO> s1 = new ArrayList<>();
        ArrayList<JobOrderItemDetailsDTO> s2 = new ArrayList<>();

        for (JobOrderItemDetails j1 : lubejob) {
            JobOrderItemDetailsDTO j = new JobOrderItemDetailsDTO();

            j.setItemCode(j1.getItem().getItemId());
            j.setMake(j1.getMake());
            j.setMaterial(j1.getItem().getItemName());
            j.setModel(j1.getModel());
            j.setPrice(Double.toString(j1.getPrice()));
            j.setQuantity(j1.getQty());
            System.out.println("GGGGGGG34Kl" + j1.getQty());

            s1.add(j);
        }

        for (JobOrderItemDetails j1 : detailJob) {
            JobOrderItemDetailsDTO j = new JobOrderItemDetailsDTO();

            j.setItemCode(j1.getItem().getItemId());
            j.setMake(j1.getMake());
            j.setMaterial(j1.getItem().getItemName());
            j.setModel(j1.getModel());
            j.setPrice(Double.toString(j1.getPrice()));
            j.setQuantity(j1.getQty());
            j.setType(j1.getLubeJobType());
            System.out.println("GGGGGGG34KLOP" + j1.getQty());
            s2.add(j);
        }

        JRBeanCollectionDataSource s3 = new JRBeanCollectionDataSource(s1);
        JRBeanCollectionDataSource s4 = new JRBeanCollectionDataSource(s2);

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put("lubeJobItems", s3);
        parameters.put("detailJobItems", s4);
        parameters.put("invoiceNumber", jobOrder.getServiceId());
        parameters.put("vehicleNumber", jobOrder.getVehicle().getVehicleNumber());
        parameters.put("chasisNumber", jobOrder.getVehicle().getEngineNumber());
        parameters.put("make", jobOrder.getVehicle().getVehicleMake());
        parameters.put("year", jobOrder.getVehicle().getYearOfManufacture());
        parameters.put("model", jobOrder.getVehicle().getVehicleModel());
        parameters.put("customerName", jobOrder.getVehicle().getCustomer().getFirstName() + " " + jobOrder.getVehicle().getCustomer().getLastName());
        parameters.put("customerPhoneNumber", jobOrder.getVehicle().getCustomer().getPhoneNumber());
        parameters.put("customerAddress", jobOrder.getVehicle().getCustomer().getAddress());
        parameters.put("total", Double.toString(jobOrder.getTotal()));
        parameters.put("lubeJobAmount", Double.toString(jobOrder.getLubeJobAmount()));
        parameters.put("detailJobAmount", Double.toString(jobOrder.getDetailJobAmount()));
        parameters.put("paymentType", jobOrder.getPaymentType());
        parameters.put("paidAmount", Double.toString(jobOrder.getPaidAmount()));
        parameters.put("creditBalance", Double.toString(jobOrder.getCreditBalance()));
        parameters.put("serviceAmount", Double.toString(jobOrder.getServiceAmount()));
        parameters.put("grossAmount", Double.toString(jobOrder.getGrossAmount()));


        String userHomeDirectory = System.getProperty("user.home");
        /* Output file location */

        String fileName = "Service_Bill_" + getCurrentDate() + "_" + getCurrentTime() + ".pdf";

        outputFile = userHomeDirectory + File.separatorChar + "Documents/" + fileName;

//        /* Using compiled version(.jasper) of Jasper report to generate PDF */
        JasperPrint jasperPrint;
        try {
            jasperPrint = JasperFillManager.fillReport(System.getProperty("user.dir") + "/BackEnd/src/main/java/lk/vsc/jasper/hobAndJube.jasper", parameters, new JREmptyDataSource());

            /* outputStream to create PDF */
            OutputStream outputStream = new FileOutputStream(new File(outputFile));
            /* Write content to PDF file */
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

            System.out.println("File Generated: " + outputFile);


        } catch (JRException e) {

            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
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
