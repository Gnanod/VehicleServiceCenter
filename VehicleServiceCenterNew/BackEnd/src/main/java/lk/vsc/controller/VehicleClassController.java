package lk.vsc.controller;


import lk.vsc.entity.VehicleClass;
import lk.vsc.service.VehicleClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "VehicleClassController")
public class VehicleClassController {

    @Autowired
    private VehicleClassService vehicleClassService;

    @PostMapping(value = "addVehicleClass")
    public VehicleClass addVehicleClass(@RequestBody VehicleClass vehClass) {
        return vehicleClassService.addVehicleClass(vehClass);

    }

    @PostMapping(value = "addVehicleClasses")
    public VehicleClass addVehicleClasses(@RequestBody VehicleClass vehClass) {

        return null;
//        return vehicleClassService.addVehicleClass(vehClass);

    }


    @PostMapping(value = "addVehicleClassesNew")
    public VehicleClass addVehicleClassesNew(@RequestBody VehicleClass vehClass) {


       return vehicleClassService.addVehicleClass(vehClass);

    }

    @GetMapping(value ="/getAllClass")
    public List<VehicleClass> getAllClass(){

        return vehicleClassService.getAllClass();
    }
}
