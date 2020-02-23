package lk.vsc.service.impl;
import lk.vsc.DTO.VehicleHistoryDTO;
import lk.vsc.DTO.ViewItemDetailsDTO;
import lk.vsc.DTO.ViewServicesDTO;
import lk.vsc.entity.Services;
import lk.vsc.repository.ServicesRepository;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServicesServiceImpl implements ServicesService {
    @Autowired
    private ServicesRepository servicesRepository;

    @Override
    public void deleteService(int serviceId) {

        servicesRepository.deleteById(serviceId);
    }

    @Override
    public Services addServices(Services services) {


        return servicesRepository.save(services);
    }

    @Override
    public List<Services> getAllServices(String vehicleType) {

        List<Object[]> s1 = servicesRepository.getAllDetails(vehicleType);

        List<Services> r = new ArrayList<>();
        for (Object o[] : s1
        ) {
            Services r1 = new Services();

//            DecimalFormat df = new DecimalFormat("0.00");
//            String price = df.format(o[4].toString());
////            services.setServicePrice(Double.parseDouble(price));
            r1.setServiceId(Integer.parseInt(o[0].toString()));
            r1.setServiceName(o[1].toString());
            r1.setServiceDesc(o[2].toString());
            r1.setVehicletype(o[3].toString());
           // System.out.println("Double Value"+Double.parseDouble(price));
            r1.setServicePrice(Double.parseDouble(o[4].toString()));
            r.add(r1);
        }

        System.out.println("len " + r.size());
        return r;
    }

    @Override
    public List<Services> getServiceDesc(String searchByServiceName) {

        List<Object[]> sd1 = servicesRepository.getServiceDesc(searchByServiceName);
        List<Services> r = new ArrayList<>();
        for (Object o[] : sd1
        ) {
            Services r1 = new Services();
            r1.setServiceDesc(o[0].toString());
            System.out.println("KKKKK"+r1.getServiceDesc());
            r.add(r1);
        }
    return r;
    }

    @Override
    public Services getServicebyId(int serviceId) {

        return servicesRepository.getServicebyId(serviceId);

    }

    @Override
    public List<Services> getAllSerivce() {


        List<Object[]> sd1 = servicesRepository.getAllSerivce();
        List<Services> r = new ArrayList<>();
        for (Object o[] : sd1
        ) {
            Services r1 = new Services();
            DecimalFormat df = new DecimalFormat("0.00");
            String price = df.format(Double.parseDouble(o[4].toString()));
            r1.setServiceDesc(o[2].toString());
            r1.setServiceId(Integer.parseInt(o[0].toString()));
            r1.setServiceName(o[1].toString());
            r1.setVehicletype(o[3].toString());
            r1.setServicePrice(Double.parseDouble(o[4].toString()));
            r.add(r1);
        }
        return r;
    }

    @Override
    public List<VehicleHistoryDTO> getAllVehicleHistoryByUsingVehNumber(String vehNumber) {
        List<Object[]> sd1 = servicesRepository.getAllVehicleHistoryByUsingVehNumber(vehNumber);
        List<VehicleHistoryDTO> r = new ArrayList<>();
        for (Object o[] : sd1
        ) {
            VehicleHistoryDTO r1 = new VehicleHistoryDTO();
                r1.setDate(o[0].toString());
                r1.setServiceId(o[1].toString());
                r1.setDetailJobAmount(o[2].toString());
                r1.setPresentOdometer(o[3].toString());
                r1.setJobId(o[4].toString());
            r.add(r1);
        }
        return r;
    }

    @Override
    public List<ViewServicesDTO> viewServiceForThisJob(String serviceID) {
        List<Object[]> sd1 = servicesRepository.viewServiceForThisJob(serviceID);
        List<ViewServicesDTO> r = new ArrayList<>();
        for (Object o[] : sd1
        ) {
            ViewServicesDTO r1 = new ViewServicesDTO();
            r1.setServiceId(o[0].toString());
            System.out.println(serviceID);
            System.out.println(o[0].toString());

            r.add(r1);
        }
        return r;
    }

    @Override
    public List<ViewItemDetailsDTO> viewItemDetails(String jobId) {
        List<Object[]> sd1 = servicesRepository.viewItemDetails(Integer.parseInt(jobId));
        List<ViewItemDetailsDTO> r = new ArrayList<>();
        for (Object o[] : sd1
        ) {
            ViewItemDetailsDTO r1 = new ViewItemDetailsDTO();
            r1.setItemCode(o[0].toString());
            Double qty = Double.parseDouble(o[1].toString());

            r1.setItemQuantity(Double.toString(qty));
            r1.setItemQuantityType(o[2].toString());
            r.add(r1);
        }
        return r;
    }

    @Override
    @Transactional
    public String reOpenJob(String serviceId ,String newJobStatus) {

        int i = servicesRepository.reOpenJob(serviceId,newJobStatus);
        if(i>0){
            return "0";
        }else{
            return null;
        }

    }


}


