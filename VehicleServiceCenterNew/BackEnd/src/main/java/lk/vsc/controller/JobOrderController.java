package lk.vsc.controller;

import lk.vsc.DTO.JobOrderDTO;
import lk.vsc.entity.Item;
import lk.vsc.entity.JobOrder;
import lk.vsc.entity.JobOrderItemDetails;
import lk.vsc.entity.Services;
import lk.vsc.service.JobOrderService;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/JobOrderController")
public class JobOrderController {

    @Autowired
    private JobOrderService jobOrderService;

    @Autowired
    private ServicesService servicesService1;

    @GetMapping(value = "/getItemsForJobOrder/{itemName}/{makeName}/{modelName}")
    public List<Item> getItemsForJobOrder(@PathVariable String itemName, @PathVariable String makeName, @PathVariable String modelName) {

        return jobOrderService.getItemsForJobOrder(itemName, makeName, modelName);

    }

    @GetMapping(value = "/getServiceDesc/{insertSelectedService}")
    public List<Services> getServiceDesc(@PathVariable String insertSelectedService){

        List<Services> l1= servicesService1.getServiceDesc(insertSelectedService);
        for (Services l: l1
             ) {

            System.out.println("Service Name :"+l.getServiceDesc());
           // System.out.println();
        }
        //System.out.println("GGGGG"+insertSelectedService);
        return l1;

    }

    @GetMapping(value = "/searchUnitPrice/{itemName}")
    public Item searchUnitPrice(@PathVariable String itemName) {

        return jobOrderService.searchUnitPrice(itemName);

    }


    @PostMapping(value = "/addJobOrder")
    public String addItem(@RequestBody JobOrderDTO jobOrder) {

        JobOrder j1 = jobOrder.getJobOrder();

        List<JobOrderItemDetails> s3 = new ArrayList<>();

        List<JobOrderItemDetails> s1 = jobOrder.getJobOrderItemDetailsArray();
        List<JobOrderItemDetails> s2 = jobOrder.getJobOrderItemDetailsArray1();

        System.out.println("S1111111111111111111"+s1);
        System.out.println("S2222222222222222222"+s2);


//        System.out.println(""+s2);
        for (JobOrderItemDetails i : s1) {

            JobOrderItemDetails j2 = new JobOrderItemDetails();
            j2.setItem(i.getItem());
            j2.setQty(i.getQty());
            System.out.println("GGGGG1"+j2.getItem().getItemId());
            System.out.println("GGGGG1"+j2.getQty());

            s3.add(j2);

        }
//
        for (JobOrderItemDetails i2 : s2) {

            JobOrderItemDetails j3 = new JobOrderItemDetails();
            j3.setItem(i2.getItem());
            j3.setQty(i2.getQty());
            System.out.println("GGGGG1"+j3.getItem().getItemId());
            System.out.println("GGGGG1"+j3.getQty());

            s3.add(j3);
        }

        j1.setJobOrderItemDetails(s3);
        System.out.println("HHHHHHH"+j1.getDate());
        System.out.println("HHHHHHH"+j1.getEmployeeName());
       System.out.println("HHHHHHH"+j1.getVehicle().getVehicleId());
//
//        for (JobOrderItemDetails f : s3){
//            System.out.println("dddddd"+f.getItem().getItemId());
//            System.out.println("dddddd"+f.getQty());
//        }


        return jobOrderService.setJobOrder(j1);
       // return null;
    }
}
