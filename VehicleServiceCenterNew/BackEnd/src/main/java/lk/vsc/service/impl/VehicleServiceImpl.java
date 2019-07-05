package lk.vsc.service.impl;

import lk.vsc.entity.Vehicle;
import lk.vsc.repository.VehicleRepository;
import lk.vsc.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService{
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Override
    public Vehicle addCustomer(Vehicle vehicle) {
        
        return vehicleRepository.save(vehicle);
        
    }

    @Override
    public List<Vehicle> getAllVehicle() {
        
        return vehicleRepository.findAll();
        
    }
}
