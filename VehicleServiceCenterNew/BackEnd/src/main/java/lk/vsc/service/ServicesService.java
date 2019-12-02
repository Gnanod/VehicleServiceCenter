package lk.vsc.service;
import lk.vsc.entity.Services;

import java.util.List;

public interface ServicesService {
    void deleteService(int serviceId);

    Services addServices (Services service);

    List<Services> getAllServices(String vehicleType);
    List<Services> getServiceDesc(String searchByServiceName);

    Services getServicebyId(int serviceId);

    List<Services> getAllSerivce();
}
