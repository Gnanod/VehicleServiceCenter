package lk.vsc.service.impl;

import lk.vsc.entity.Item;
import lk.vsc.entity.JobOrder;
import lk.vsc.entity.Supplier;
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

        }


        return i;

    }

    @Override
    @Transactional
    public String setJobOrder(JobOrder j1) {

        JobOrder s1=jobOrderRepository.save(j1);
        if (s1 != null) {
            return "Y";
        }else{
            return null;
        }

    }
}
