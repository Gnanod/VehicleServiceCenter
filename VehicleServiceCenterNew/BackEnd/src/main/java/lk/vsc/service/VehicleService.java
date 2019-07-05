package lk.vsc.service;

import lk.vsc.entity.Vehicle;

import java.util.List;

public interface VehicleService {
    Vehicle addCustomer(Vehicle vehicle);

    List<Vehicle> getAllVehicle();
}
