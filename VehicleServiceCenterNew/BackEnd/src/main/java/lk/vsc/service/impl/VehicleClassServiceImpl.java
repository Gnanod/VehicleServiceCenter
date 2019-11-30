package lk.vsc.service.impl;

import lk.vsc.entity.VehicleClass;
import lk.vsc.repository.VehicleClassRepository;
import lk.vsc.service.VehicleClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleClassServiceImpl implements VehicleClassService {

    @Autowired
    private VehicleClassRepository vehicleClassRepository;

    @Override
    public VehicleClass addVehicleClass(VehicleClass vehClass) {
        return vehicleClassRepository.save(vehClass);
    }

    @Override
    public List<VehicleClass> getAllClass() {
        return  vehicleClassRepository.findAll();
    }
}
