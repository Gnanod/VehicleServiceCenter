package lk.vsc.controller;
import lk.vsc.entity.Services;
import lk.vsc.entity.Vehicle;
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

    @GetMapping(value = "/getAllServices")
    public List<Services> getAllSerivces(){

        return this.servicesService.getAllServices();
    }

    @DeleteMapping("/deleteService/{serviceId}")
    void deleteEmployee(@PathVariable int serviceId) {
        this.servicesService.deleteService(serviceId);
    }

    @GetMapping(value = "/getServicebyId/{serviceId}")
    public Services getServicebyId(@PathVariable int serviceId){
        System.out.println("GGGGGGGGGGGGGGG");
        return servicesService.getServicebyId(serviceId);
    }


}

