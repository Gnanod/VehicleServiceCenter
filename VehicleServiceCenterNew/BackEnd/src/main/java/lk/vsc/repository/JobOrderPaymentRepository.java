package lk.vsc.repository;

import lk.vsc.entity.JobOrderPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobOrderPaymentRepository  extends JpaRepository<JobOrderPayment,Integer> {
}
