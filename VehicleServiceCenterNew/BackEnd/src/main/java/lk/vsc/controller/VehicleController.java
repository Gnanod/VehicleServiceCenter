package lk.vsc.controller;

import lk.vsc.entity.Vehicle;
import lk.vsc.service.VehicleService;
import lk.vsc.service.impl.VehicleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/VehicleController")
public class VehicleController {
    
 @Autowired
    private VehicleService vehicleService;

    @PostMapping(value = "/AddVehicle")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle){
        
        return vehicleService.addVehicle(vehicle);

    }

    @GetMapping(value ="/getAllVehicle")
    public List<Vehicle> getAllVehicle(){

        return vehicleService.getAllVehicle();
        
    }

    @GetMapping(value = "/searchByVehicleNumber/{vehicleNumber}")
    public Vehicle searchByVehicleNumber(@PathVariable String vehicleNumber){
        System.out.println("GGGGGGGGGGGGGGG");
        return vehicleService.searchByVehicleNumber(vehicleNumber);
    }


    @PostMapping(value = "/updateVehicleDetails")
    public Vehicle updateVehicleDetails(@RequestBody Vehicle vehicle){

        return vehicleService.updateVehicle(vehicle);

    }
//    @DeleteMapping("/deleteVehicle/{nic}")
//    void deleteVehicleById(@PathVariable int vehicleId) {
//        vehicleService.deleteCustomer(vehicleId);
//    }

    @DeleteMapping("/deleteVehicle/{vehicleId}")
    void deleteVehicleById(@PathVariable int vehicleId) {
        vehicleService.deleteVehicleById(vehicleId);
    }
}
