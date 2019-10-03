package lk.vsc.service.impl;
import lk.vsc.entity.Services;
import lk.vsc.entity.Supplier;
import lk.vsc.repository.ServicesRepository;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Services> getAllServices() {

        List<Object[]> s1 = servicesRepository.getAllDetails();

        List<Services> r = new ArrayList<>();
        for (Object o[] : s1
        ) {
            Services r1 = new Services();

            r1.setServiceId(Integer.parseInt(o[0].toString()));
            r1.setServiceName(o[1].toString());
            r1.setServiceDesc(o[2].toString());
            r1.setVehicletype(o[3].toString());
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



}


