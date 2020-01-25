package lk.vsc.service.impl;

import lk.vsc.entity.*;
import lk.vsc.repository.ItemRepository;
import lk.vsc.repository.JobOrderRepository;
import lk.vsc.repository.PrintJobOrderRepository;
import lk.vsc.repository.ServiceJobRepository;
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

    @Override
    public List<Item> getItemsForJobOrder(String itemName, String makeName, String modelName) {

        System.out.println("My Name Is Khan");
        List<Object[]> jobOrderRepo = jobOrderRepository.getItemsForJobOrder(itemName,makeName,modelName);

        List<Item> s1 = new ArrayList<Item>();
        System.out.println("KKKKKKK"+jobOrderRepo);
        for (Object s2[] :jobOrderRepo) {

            Item s3 = new Item();
            s3.setItemName(s2[0].toString());
            s3.setItemId(s2[1].toString());
            s3.setQuantityOnHand(Double.parseDouble(s2[2].toString()));
            s3.setQuantityOfPrice(Double.parseDouble(s2[3].toString()));
            s3.setStockLevel(Double.parseDouble(s2[4].toString()));
            s3.setItemQuantityType(s2[5].toString());
            System.out.println("LLL"+s2[0].toString());
            s1.add(s3);
        }
        return s1;
    }

    @Override

    public Item searchUnitPrice(String itemName) {

        List<Object []> ob = jobOrderRepository.searchUnitPrice(itemName);

        Item i = new Item();
        for (Object s2[] :ob) {

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

        JobOrder s1=jobOrderRepository.save(j1);
        if (s1 != null) {

            List<JobOrderItemDetails> s4 = j1.getJobOrderItemDetails();



                for (JobOrderItemDetails s2:s4
                ) {

                    Item i1 = s2.getItem();

                    Object i2 = itemRepository.getItemDetails(i1.getItemId());
                    double newQuantity = Double.parseDouble(i2.toString())-i1.getQuantityOnHand();
                    i1.setQuantityOnHand(newQuantity);
                    Item i = itemRepository.save(i1);

                }

            return "9";


        }else{

            return null;

        }

    }

    @Override
    public double getTotalSales() {

        Object ob = jobOrderRepository.getTotalSales();

        if(ob!=null){

            return Double.parseDouble(ob.toString());

        }else{

            return 0;
        }


    }

    @Override
    public double getTodayJobCount() {
        Object ob = jobOrderRepository.getTodayJobCount();

        if(ob!=null){

            return Double.parseDouble(ob.toString());

        }else{

            return 0;
        }
    }

    @Override
    public double getMonthlyTotalSales() {

        Object ob = jobOrderRepository.getMonthlyTotalSales();



        if(ob!=null){

            return Double.parseDouble(ob.toString());


        }else{

            return 0;
        }
    }

    @Override
    public String[] getDetailsAccordingToServiceId(String id) {


        ServiceJob s1 =serviceJobRepository.getDetailsAccordingToServiceId(id);

//        System.out.println("Ob1"+ob[0].toString());
//        System.out.println("Ob2"+ob[1]);
           String []arr = new String[3] ;
           if(s1!=null){
               arr[0]=Integer.toString(s1.getVehicle().getVehicleId());
               arr[1]=Double.toString(s1.getTotal());
               arr[2]=s1.getPresentOdoMeter();
               return arr;
           }else{
               return  null;
           }


    }

    @Override
    public JobOrder serchPreviousJobs(String vehicleId) {

        Object s1 = serviceJobRepository.serchPreviousJobs(Integer.parseInt(vehicleId));

        if(s1!=null){
            JobOrder j1 = new JobOrder();
            j1.setServiceId(s1.toString());
            return j1;
        }else{
            return null;
        }

    }

    @Override
    public String printJobOrder(PrintJobOrder j1) {

        PrintJobOrder p = printJobOrderRepository.save(j1);
        if(p!=null){
            return "S";
        }else{
            return null;
        }

    }
}
