package lk.vsc.service.impl;

import lk.vsc.entity.Item;
import lk.vsc.entity.JobOrder;
import lk.vsc.entity.JobOrderItemDetails;
import lk.vsc.entity.Supplier;
import lk.vsc.repository.ItemRepository;
import lk.vsc.repository.JobOrderRepository;
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
    @Override
    public List<Item> getItemsForJobOrder(String itemName, String makeName, String modelName) {

        System.out.println("My Name Is Khan");
        List<Object[]> jobOrderRepo = jobOrderRepository.getItemsForJobOrder(itemName,makeName,modelName);

        List<Item> s1 = new ArrayList<Item>();
        System.out.println("KKKKKKK"+jobOrderRepo);
        for (Object s2[] :jobOrderRepo) {

            Item s3 = new Item();
            s3.setItemName(s2[0].toString());
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
            i.setItemId(Integer.parseInt(s2[1].toString()));
            i.setItemName(s2[2].toString());
            i.setQuantityOnHand(Double.parseDouble(s2[3].toString()));
            i.setStockLevel(Double.parseDouble(s2[4].toString()));

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
}
