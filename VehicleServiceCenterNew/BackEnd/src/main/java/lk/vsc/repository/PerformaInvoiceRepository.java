package lk.vsc.repository;

import lk.vsc.entity.PerformaInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PerformaInvoiceRepository extends JpaRepository<PerformaInvoice,String> {

    @Query(value = " select performa_invoice_id from performa_invoice order by 1 desc limit 1",nativeQuery = true)
    Object getLastId();
}
