package lk.vsc.repository;

import lk.vsc.entity.VehicleClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleClassRepository extends JpaRepository<VehicleClass,Integer> {
}
