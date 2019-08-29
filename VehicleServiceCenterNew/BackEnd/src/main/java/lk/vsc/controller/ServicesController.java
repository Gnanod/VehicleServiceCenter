package lk.vsc.controller;
import lk.vsc.entity.Services;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
}
