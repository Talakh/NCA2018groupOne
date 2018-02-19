package ncadvanced2018.groupeone.parent.dao;

import ncadvanced2018.groupeone.parent.model.entity.Address;
import ncadvanced2018.groupeone.parent.model.entity.Office;

import java.util.List;

public interface OfficeDao  extends CrudDao<Office, Long> {
    List<Office> findByName(String name);

    List<Office> findByAddress(Address address);

    List<Office> findAll();
}
