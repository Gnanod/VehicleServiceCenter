package lk.vsc.repository;


import lk.vsc.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier,Integer> {

    @Query(value = "from Supplier where agentName   Like CONCAT('%',:supplierId,'%')")
    List<Supplier> searchBySupplierNumber(@Param("supplierId") String supplierId);

    @Query(value = "select distinct companyName from Supplier ")
    List<Object[]> findAllCompanies();

    @Query(value = "select agentName,supplierId from Supplier where companyName = :supplierCompany")
    List<Object[]> getSupplierNames(@Param("supplierCompany") String supplierCompany);

    @Query(value = "" +
            "select v.vehicle_number,fi.service_id,fi.date,fi.total_amount,fi.payment_type_invoice," +
            " fi.total_amount-sum(fip.payment) from final_invoice fi " +
            " left join job_order jo ON fi.service_id = jo.service_id " +
            " left join final_invoice_payment fip On fi.final_invoice_id = fip.final_invoice_final_invoice_id " +
            " left join vehicle v ON jo. vehicle_vehicle_id=v.vehicle_id " +
            " where fi.service_id =?1 " +
            " group By fip.final_invoice_final_invoice_id",nativeQuery = true)
    List<Object[]> searchServiceDetailsByNumber(String serviceId);

}



