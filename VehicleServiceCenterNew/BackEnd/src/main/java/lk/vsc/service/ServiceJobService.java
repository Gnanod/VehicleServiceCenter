package lk.vsc.service;

import lk.vsc.entity.ServiceJob;
import lk.vsc.entity.ServiceJobDetails;

import java.util.List;

public interface ServiceJobService {
//    String addServiceJob(ServiceJob serviceJob);

    String addServiceJobs(ServiceJob s3, List<ServiceJobDetails> j1);
}
