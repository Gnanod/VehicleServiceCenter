package lk.vsc.repository;

import lk.vsc.entity.FinalInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FinalInvoiceRepository extends JpaRepository<FinalInvoice,Integer> {

    @Query(value = "from FinalInvoice  where  serviceId=?1")
    FinalInvoice getFinalInvoice(String service_id);

}
