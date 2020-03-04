package lk.vsc.service.impl;

import lk.vsc.DTO.FinalJobCloseDTO;
import lk.vsc.entity.*;
import lk.vsc.repository.*;
import lk.vsc.service.JobOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobOrderServiceImpl implements JobOrderService {


    @Autowired
    private JobOrderRepository jobOrderRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private ServiceJobRepository serviceJobRepository;
    @Autowired
    private PrintJobOrderRepository printJobOrderRepository;
    @Autowired
    private JobOrderItemDetailsRepository jobOrderItemDetailsRepository;
    @Autowired
    private JobCloseRepository jobCloseRepository;
    @Autowired
    private ServicesRepository servicesRepository;

    @Override
    public List<Item> getItemsForJobOrder(String itemName, String makeName, String modelName) {
        List<Object[]> jobOrderRepo = jobOrderRepository.getItemsForJobOrder(itemName, makeName, modelName);

        List<Item> s1 = new ArrayList<Item>();
        for (Object s2[] : jobOrderRepo) {
            Item s3 = new Item();
            s3.setItemName(s2[0].toString());
            s3.setItemId(s2[1].toString());
            s3.setQuantityOnHand(Double.parseDouble(s2[2].toString()));
            s3.setQuantityOfPrice(Double.parseDouble(s2[3].toString()));
            s3.setStockLevel(Double.parseDouble(s2[4].toString()));
            s3.setItemQuantityType(s2[5].toString());
            s1.add(s3);
        }
        return s1;
    }

    @Override

    public Item searchUnitPrice(String itemName) {

        List<Object[]> ob = jobOrderRepository.searchUnitPrice(itemName);

        Item i = new Item();
        for (Object s2[] : ob) {

            i.setQuantityOfPrice(Double.parseDouble(s2[0].toString()));
            i.setItemId(s2[1].toString());
            i.setItemName(s2[2].toString());
            i.setQuantityOnHand(Double.parseDouble(s2[3].toString()));
            i.setStockLevel(Double.parseDouble(s2[4].toString()));
            i.setItemQuantityType(s2[5].toString());

        }


        return i;

    }

    @Override
    @Transactional
    public String setJobOrder(JobOrder j1) {

        List<Object[]> ob = jobOrderRepository.checkJobOrderIsIn(j1.getServiceId());
        int jobId = 0;
        double newDetailAmount = 0;
        double newLubeJobAmount = 0;
        String odoMeter = null;
        if (ob.size() != 0) {
            for (Object s2[] : ob) {
                jobId = Integer.parseInt(s2[0].toString());
                newDetailAmount = j1.getDetailJobAmount() + Double.parseDouble(s2[1].toString());
                newLubeJobAmount = j1.getLubeJobAmount() + Double.parseDouble(s2[2].toString());
                odoMeter = s2[3].toString();
            }
            int status = jobOrderRepository.updateJobOrder(jobId, newDetailAmount, newLubeJobAmount, odoMeter);

            if (status > 0) {
                List<JobOrderItemDetails> o1 = j1.getJobOrderItemDetails();
                for (JobOrderItemDetails joid1:o1
                     ) {
                    JobOrderItemDetails j5 = new JobOrderItemDetails();
                    j5.setItemStatus(joid1.getItemStatus());
                    j5.setLubeJobType(joid1.getLubeJobType());
                    j5.setMake(joid1.getMake());
                    j5.setModel(joid1.getModel());
                    j5.setPrice(joid1.getPrice());
                    j5.setQty(joid1.getQty());
                    j5.setItem(joid1.getItem());
                    j5.setReOpenStatus("First");
                    JobOrder jo = new JobOrder();
                    jo.setJobID(jobId);
                    j5.setJobOrder(jo);
                    jobOrderItemDetailsRepository.save(j5);
                    Item i1 = joid1.getItem();
//                    Object i2 = itemRepository.getItemDetails(i1.getItemId());
//                    double newQuantity = Double.parseDouble(i2.toString()) - joid1.getQty();
//                    i1.setQuantityOnHand(newQuantity);
//                    Item i = itemRepository.save(i1);

                }

                return "0";

            }else{
                return  null;
            }
        } else {

            JobOrder s1 = jobOrderRepository.save(j1);
            if (s1 != null) {
//                List<JobOrderItemDetails> s4 = j1.getJobOrderItemDetails();
//                for (JobOrderItemDetails s2 : s4
//                ) {
//                    Item i1 = s2.getItem();
//                    Object i2 = itemRepository.getItemDetails(i1.getItemId());
//                    double newQuantity = Double.parseDouble(i2.toString()) - i1.getQuantityOnHand();
//                    i1.setQuantityOnHand(newQuantity);
//                    Item i = itemRepository.save(i1);
//                }
                return "9";
            } else {
                return null;
            }
        }


    }

    @Override
    public double getTotalSales() {

        Object ob = jobOrderRepository.getTotalSales();

        if (ob != null) {

            return Double.parseDouble(ob.toString());

        } else {

            return 0;
        }


    }

    @Override
    public double getTodayJobCount() {
        Object ob = jobOrderRepository.getTodayJobCount();

        if (ob != null) {

            return Double.parseDouble(ob.toString());

        } else {

            return 0;
        }
    }

    @Override
    public double getMonthlyTotalSales() {

        Object ob = jobOrderRepository.getMonthlyTotalSales();


        if (ob != null) {

            return Double.parseDouble(ob.toString());


        } else {

            return 0;
        }
    }

    @Override
    public String[] getDetailsAccordingToServiceId(String id) {


        ServiceJob s1 = serviceJobRepository.getDetailsAccordingToServiceId(id);

//        System.out.println("Ob1"+ob[0].toString());
//        System.out.println("Ob2"+ob[1]);
        String[] arr = new String[4];
        if (s1 != null) {
            arr[0] = Integer.toString(s1.getVehicle().getVehicleId());
            arr[1] = Double.toString(s1.getTotal());
            arr[2] = s1.getPresentOdoMeter();
            arr[3] = s1.getJobStatus();
            return arr;
        } else {
            return null;
        }


    }

    @Override
    public JobOrder serchPreviousJobs(String vehicleId) {

        Object s1 = serviceJobRepository.serchPreviousJobs(Integer.parseInt(vehicleId));

        if (s1 != null) {
            JobOrder j1 = new JobOrder();
            j1.setServiceId(s1.toString());
            return j1;
        } else {
            return null;
        }

    }

    @Override
    public String printJobOrder(PrintJobOrder j1) {

        PrintJobOrder p = printJobOrderRepository.save(j1);
        if (p != null) {
            return "S";
        } else {
            return null;
        }

    }

    @Override
    public JobOrderItemDetails getJobOrderDetailsAccordingToId(int id) {
        return jobOrderItemDetailsRepository.getJobOrderDetailsAccordingToId(id);
    }

    @Override
    @Transactional
    public String saveJobClose(FinalJobCloseDTO jobClose) {

        JobClose j1 = jobClose.getJobClose();
        JobClose prevJobClose = jobCloseRepository.searchPreviousJobClose(j1.getServiceId());


        if(prevJobClose ==null){

            List<JobOrderItemDetails> jobOrderItemDetails = jobClose.getJobOrderItemDetails();
            List<ServiceJobDetails> serviceJobDetails = jobClose.getServiceJobDetails();
            jobCloseRepository.save(j1);

            for (JobOrderItemDetails j2 : jobOrderItemDetails
            ) {
                jobOrderItemDetailsRepository.updateDetails(j2.getJobOrderServiceDetails(), j2.getQty(), j2.getItemStatus(), j2.getPrice());
                double qtyOnHand = Double.parseDouble(itemRepository.getItemDetails(j2.getItem().getItemId()).toString());
                double finalQuantity = qtyOnHand - j2.getQty();
                itemRepository.updateQty(finalQuantity, j2.getItem().getItemId());
            }

            for (ServiceJobDetails j3 : serviceJobDetails
            ) {
                serviceJobRepository.updateDetails(j3.getServicedetailsID(), j3.getJob_status());
            }

            int k = serviceJobRepository.updateServiceJobStatus(j1.getServiceId());

            if (k > 0) {
                return "0";
            } else {
                return null;
            }
        }else{

            prevJobClose.setItemAmount(jobClose.getJobClose().getItemAmount());
            prevJobClose.setServiceAmount(jobClose.getJobClose().getServiceAmount());
            jobCloseRepository.updateJobClose(jobClose.getJobClose().getItemAmount(),jobClose.getJobClose().getServiceAmount(),jobClose.getJobClose().getJobCloseId());

            List<JobOrderItemDetails> jobOrderItemDetails1 = jobClose.getJobOrderItemDetails();
            List<ServiceJobDetails> serviceJobDetails1 = jobClose.getServiceJobDetails();

            Object jobOrderId = servicesRepository.getJobOrderId(j1.getServiceId());

            List<Object []> currentItem = jobCloseRepository.currentItemAccordingToJoborderId(Integer.parseInt(jobOrderId.toString()));

            for (JobOrderItemDetails j2 : jobOrderItemDetails1
            ) {

                jobOrderItemDetailsRepository.updateDetails(j2.getJobOrderServiceDetails(), j2.getQty(), j2.getItemStatus(), j2.getPrice());
                double qtyOnHand = Double.parseDouble(itemRepository.getItemDetails(j2.getItem().getItemId()).toString());
                double finalQuantity = qtyOnHand - j2.getQty();
                itemRepository.updateQty(finalQuantity, j2.getItem().getItemId());
            }

            for (ServiceJobDetails j3 : serviceJobDetails1
            ) {
                serviceJobRepository.updateDetails(j3.getServicedetailsID(), j3.getJob_status());
            }

            int k = serviceJobRepository.updateServiceJobStatus(j1.getServiceId());

            if (k > 0) {
                return "0";
            } else {
                return null;
            }

        }






    }

    @Override
    public JobClose searchServiceAndItemDetailsAmountByServiceId(String serviceId) {
        return jobCloseRepository.searchServiceAndItemDetailsAmountByServiceId(serviceId);
    }

    @Override
    public String[] getDetailsAccordingToServiceIdReOpen(String id) {
        ServiceJob s1 = serviceJobRepository.getDetailsAccordingToServiceIdReOpen(id);

//        System.out.println("Ob1"+ob[0].toString());
//        System.out.println("Ob2"+ob[1]);
        String[] arr1 = new String[4];
        if (s1 != null) {
            arr1[0] = Integer.toString(s1.getVehicle().getVehicleId());
            arr1[1] = Double.toString(s1.getTotal());
            arr1[2] = s1.getPresentOdoMeter();
            arr1[3] = s1.getJobStatus();
            return arr1;
        } else {
            return null;
        }
    }
}
