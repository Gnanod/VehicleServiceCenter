package lk.vsc.controller;
import lk.vsc.entity.Services;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/ServicesController")
public class ServicesController {

    @Autowired
    private ServicesService servicesService;

    @PostMapping(value = "/addServices")
    public Services addServices(@RequestBody Services services){

        return servicesService.addServices(services);

    }

    @GetMapping(value = "/getAllServices/{vehicleType}")
    public List<Services> getAllSerivces(@PathVariable String vehicleType){

        return this.servicesService.getAllServices(vehicleType);
    }

    @GetMapping(value = "/getAllServiceDetails")
    public List<Services> getAllServiceDetails(){
        System.out.println("Gnanod");
        return this.servicesService.getAllSerivce();
    }


    @DeleteMapping("/deleteService/{serviceId}")
    void deleteEmployee(@PathVariable int serviceId) {
        this.servicesService.deleteService(serviceId);
    }

    @GetMapping(value = "/getServicebyId/{serviceId}")
    public Services getServicebyId(@PathVariable int serviceId){

        return servicesService.getServicebyId(serviceId);
    }


}

