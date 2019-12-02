package lk.vsc.repository;

import lk.vsc.entity.ServiceJobDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceJobDetailRepository extends JpaRepository<ServiceJobDetails,Integer> {
}
