package lk.vsc.service;

import lk.vsc.entity.Vehicle;

import java.util.List;

public interface VehicleService {


    List<Vehicle> getAllVehicle();

    Vehicle addVehicle(Vehicle vehicle);

    List<Vehicle> searchByVehicleNumber(String vehicleNumber);

    Vehicle updateVehicle(Vehicle vehicle);

    void deleteVehicleById(int vehicleId);

    Vehicle searchByVehicleId(int parseInt);

    Vehicle searchVehicleNumbers(String serviceJobId);

    Vehicle searchVehicleDetailsByNumber(String vehicleNumber);


//   Vehicle searchByVehicleNumber(String vehicleNumber);

//    void deleteCustomer(int vehicleId);
}
