package lk.vsc.service.impl;

import lk.vsc.entity.ServiceJob;
import lk.vsc.entity.ServiceJobDetails;
import lk.vsc.repository.ServiceJobDetailRepository;
import lk.vsc.repository.ServiceJobRepository;
import lk.vsc.service.ServiceJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceJobServiceImpl implements ServiceJobService {

    @Autowired
    private ServiceJobRepository serviceJobRepository;
    @Autowired
    private ServiceJobDetailRepository serviceJobDetailRepository;

    @Override
    public String addServiceJobs(ServiceJob s3, List<ServiceJobDetails> j1) {
        ServiceJob s1 = serviceJobRepository.save(s3);
        if (s1 != null) {

            List<ServiceJobDetails> serviceJobDetails = j1;
        for (ServiceJobDetails s:serviceJobDetails
             ) {
            System.out.println("MMMMMMMMMMMM"+s.getServiceJobId());
            System.out.println("MMMMMMMMMMMM"+s.getServiceId());
            serviceJobDetailRepository.save(s);
        }

        }
        return "sd";
    }
}
