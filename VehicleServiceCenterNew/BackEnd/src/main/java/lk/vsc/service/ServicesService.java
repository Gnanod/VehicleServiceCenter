package lk.vsc.service;
import lk.vsc.DTO.VehicleHistoryDTO;
import lk.vsc.DTO.ViewItemDetailsDTO;
import lk.vsc.DTO.ViewServicesDTO;
import lk.vsc.entity.Services;

import java.util.List;

public interface ServicesService {
    void deleteService(int serviceId);

    Services addServices (Services service);

    List<Services> getAllServices(String vehicleType);
    List<Services> getServiceDesc(String searchByServiceName);

    Services getServicebyId(int serviceId);

    List<Services> getAllSerivce();

    List<VehicleHistoryDTO> getAllVehicleHistoryByUsingVehNumber(String vehNumber);

    List<ViewServicesDTO> viewServiceForThisJob(String serviceID);

    List<ViewItemDetailsDTO> viewItemDetails(String jobId);

    String reOpenJob(String id, String newJobStatus);
}
