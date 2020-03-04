package lk.vsc.repository;


import lk.vsc.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle,Integer> {
    @Query(value = "from Vehicle v where  v.vehicleNumber   Like CONCAT('%',:vehicle_number,'%')  or v.customer.nic Like CONCAT('%',:vehicle_number,'%') or v.customer.firstName Like CONCAT('%',:vehicle_number,'%') ")
    List<Vehicle> searchByVehicleNum(@Param("vehicle_number")String vehicle_number);

    @Query(value = "from Vehicle  where vehicleId=?1")
    Vehicle searchByVehicleId(int parseInt);

    @Query(value = "select  vehicleNumber,presentOdoMeter from PrintJobOrder where serviceJobId=:serviceJobId")
    List<Object[]> searchVehicleNumbers(@Param("serviceJobId")String serviceJobId);

    @Query(value = "from Vehicle v where  v.vehicleNumber=?1")
    Vehicle searchVehicleDetailsByNumber(String vehicleNumber);
}
