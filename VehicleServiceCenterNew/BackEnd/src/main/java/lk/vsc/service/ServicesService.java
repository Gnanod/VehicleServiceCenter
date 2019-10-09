package lk.vsc.service;
import lk.vsc.entity.Services;
import lk.vsc.entity.Supplier;

import java.util.List;

public interface ServicesService {
    void deleteService(int serviceId);

    Services addServices (Services service);

    List<Services> getAllServices();
    List<Services> getServiceDesc(String searchByServiceName);

    Services getServicebyId(int serviceId);
}
