package lk.vsc.service.impl;

import lk.vsc.entity.ServiceJob;
import lk.vsc.repository.ServiceJobRepository;
import lk.vsc.service.ServiceJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ServiceJobServiceImpl implements ServiceJobService {

    @Autowired
    private ServiceJobRepository serviceJobRepository;


    @Override
    @Transactional
    public String addServiceJob(ServiceJob serviceJob) {

        serviceJobRepository.save(serviceJob);
        System.out.println("GASDFASDASDADDASD");
        return "sd";
    }
}
