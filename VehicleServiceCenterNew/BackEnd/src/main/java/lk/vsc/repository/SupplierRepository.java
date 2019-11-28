package lk.vsc.repository;


import lk.vsc.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier,Integer> {

    @Query(value = "from Supplier where agentName = :supplierId")
    List<Supplier> searchBySupplierNumber(@Param("supplierId") String supplierId);

    @Query(value = "select distinct companyName from Supplier ")
    List<Object[]> findAllCompanies();

    @Query(value = "select agentName,supplierId from Supplier where companyName = :supplierCompany")
    List<Object[]> getSupplierNames(@Param("supplierCompany") String supplierCompany);

    @Query(value = "select v.vehicleNumber,j.serviceId,j.date,j.grossAmount,j.paymentType,j.creditBalance from Vehicle v , JobOrder j where v.vehicleId = j.vehicle.vehicleId AND j.serviceId = :serviceId")
    List<Object[]> searchServiceDetailsByNumber(@Param("serviceId")String serviceId);


}



