package lk.vsc.repository;

import lk.vsc.entity.PrintJobOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrintJobOrderRepository extends JpaRepository<PrintJobOrder,Integer> {
}
