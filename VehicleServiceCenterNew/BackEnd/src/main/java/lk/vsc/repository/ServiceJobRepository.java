package lk.vsc.repository;

import lk.vsc.entity.JobOrder;
import lk.vsc.entity.ServiceJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceJobRepository extends JpaRepository<ServiceJob,Integer> {

}
