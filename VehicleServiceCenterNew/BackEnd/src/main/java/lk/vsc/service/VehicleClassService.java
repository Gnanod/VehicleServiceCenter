package lk.vsc.service;

import lk.vsc.entity.VehicleClass;

import java.util.List;

public interface VehicleClassService {
    VehicleClass addVehicleClass(VehicleClass vehClass);

    List<VehicleClass> getAllClass();
}
