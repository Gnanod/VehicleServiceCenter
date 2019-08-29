package lk.vsc.service.impl;
import lk.vsc.entity.Services;
import lk.vsc.repository.ServicesRepository;
import lk.vsc.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServicesServiceImpl implements ServicesService {
    @Autowired
    private ServicesRepository servicesRepository;

    @Override
    public Services addServices(Services services) {

        return servicesRepository.save(services);
    }
}
