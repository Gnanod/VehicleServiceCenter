package lk.vsc.controller;

import lk.vsc.entity.Vehicle;
import lk.vsc.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/VehicleController")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @PostMapping(value = "/addVehicle")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle){
        
        return vehicleService.addCustomer(vehicle);

    }

    @GetMapping(value ="/getAllVehicle")
    public List<Vehicle> getAllVehicle(){

        return vehicleService.getAllVehicle();
    }
}
