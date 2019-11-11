package lk.vsc.controller;

import lk.vsc.DTO.JobOrderDTO;
import lk.vsc.entity.ServiceJob;
import lk.vsc.service.JobOrderService;
import lk.vsc.service.ServiceJobService;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/ServiceJobController")
public class ServiceJobController {


    @Autowired
    private ServiceJobService serviceJobService;

    @PostMapping(value = "/addServiceJob")
    public String addItem(@RequestBody ServiceJob serviceJob) {

        String s =serviceJobService.addServiceJob(serviceJob);

        if(s.length()!=0){
            return "0";
        }else{
            return null;
        }

    }


}
