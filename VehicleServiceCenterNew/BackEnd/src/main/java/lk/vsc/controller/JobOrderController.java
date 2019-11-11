package lk.vsc.controller;

import lk.vsc.DTO.JobOrderDTO;
import lk.vsc.DTO.VehicleCustomerDTO;
import lk.vsc.entity.*;
import lk.vsc.repository.ServiceJobRepository;
import lk.vsc.service.JobOrderService;
import lk.vsc.service.ServicesService;
import lk.vsc.service.VehicleService;
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

    @GetMapping(value = "/getTotalSales")
    public double getTotalSales() {

        return jobOrderService.getTotalSales();

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

        String    arr[]= jobOrderService.getDetailsAccordingToServiceId(id);
                  Vehicle v1 = vehicleService.searchByVehicleId(Integer.parseInt(arr[0]));

                  VehicleCustomerDTO v = new VehicleCustomerDTO();
                  v.setChassisNumber(v1.getEngineNumber());
                  v.setVehicleId(arr[0]);
                  v.setCustomerEmail(v1.getCustomer().getEmail());
                  v.setCustomerName(v1.getCustomer().getFirstName()+v1.getCustomer().getLastName());
                  v.setCustomerPhone(v1.getCustomer().getPhoneNumber());
                  v.setMake(v1.getVehicleMake());
                  v.setModel(v1.getVehicleModel());
                  v.setYear(v1.getYearOfManufacture());
                  v.setVehicleNumber(v1.getVehicleNumber());
                  v.setServiceTotal(Double.parseDouble(arr[1]));

return v;
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

//
//        for (JobOrderItemDetails f : s3){
//            System.out.println("dddddd"+f.getItem().getItemId());
//            System.out.println("dddddd"+f.getQty());
//        }


        return jobOrderService.setJobOrder(j1);



    }
}
