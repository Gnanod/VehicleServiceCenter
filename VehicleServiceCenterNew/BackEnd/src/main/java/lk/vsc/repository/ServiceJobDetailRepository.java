package lk.vsc.repository;

import lk.vsc.entity.ServiceJob;
import lk.vsc.entity.ServiceJobDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ServiceJobDetailRepository extends JpaRepository<ServiceJobDetails,Integer> {

    @Query(value = "from ServiceJob  where serviceJobId=?1")
    ServiceJob getSserviceJob(String serviceJobId);
}
