package lk.vsc.service.impl;

import lk.vsc.entity.Vehicle;
import lk.vsc.repository.VehicleRepository;
import lk.vsc.service.VehicleService;
import org.hibernate.TransientPropertyValueException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService{
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Override
    public List<Vehicle> getAllVehicle() {
        
        return vehicleRepository.findAll();
        
    }

    @Override
    @Transactional
    public Vehicle addVehicle(Vehicle vehicle) {
        Vehicle vh=null;
        vh=vehicleRepository.save(vehicle);
//        try{
//            System.out.println("rrrrrrrrrrrrrrrR");
//            vh=vehicleRepository.save(vehicle);
//            
//        }catch (Exception e){
//
//            System.out.println("GGGGGG");
//           
//            
//        }
       
        if(vh!=null){
            return vh;
        }else{
            return null;
        }
    }

    @Override
    public Vehicle searchByVehicleNumber(String vehicleNumber) {
        return vehicleRepository.searchByVehicleNum(vehicleNumber);
    }

    @Override
    public Vehicle updateVehicle(Vehicle vehicle) {
        
        return vehicleRepository.save(vehicle);
        
    }

    @Override
    public void deleteVehicleById(int vehicleId) {
        
         vehicleRepository.deleteById(vehicleId);
         
    }

    @Override
    public Vehicle searchByVehicleId(int parseInt) {
        return  vehicleRepository.searchByVehicleId(parseInt);
    }

    @Override
    public Vehicle searchVehicleNumbers(String serviceJobId) {
        Object o = vehicleRepository.searchVehicleNumbers(serviceJobId);

        if(o!=null){
            Vehicle v1 = new Vehicle();

            v1.setVehicleNumber(o.toString());
            return v1;
        }else{
            return null;
        }

    }

}
