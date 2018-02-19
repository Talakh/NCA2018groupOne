package ncadvanced2018.groupeone.parent.dao.impl;

import lombok.NoArgsConstructor;
import ncadvanced2018.groupeone.parent.dao.AddressDao;
import ncadvanced2018.groupeone.parent.dao.OfficeDao;
import ncadvanced2018.groupeone.parent.model.entity.Address;
import ncadvanced2018.groupeone.parent.model.entity.Office;
import ncadvanced2018.groupeone.parent.model.entity.User;
import ncadvanced2018.groupeone.parent.model.entity.impl.RealOffice;
import ncadvanced2018.groupeone.parent.model.proxy.ProxyAddress;
import ncadvanced2018.groupeone.parent.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
@NoArgsConstructor
public class OfficeDaoImpl implements OfficeDao {
    private NamedParameterJdbcOperations jdbcTemplate;
    private SimpleJdbcInsert officeInsert;
    private OfficeWithDetailExtractor officeWithDetailExtractor;
    private QueryService queryService;
    private AddressDao addressDao;

    @Autowired
    public OfficeDaoImpl(QueryService queryService, AddressDao addressDao) {
        this.queryService = queryService;
        this.addressDao = addressDao;
    }

    @Autowired
    public void setDataSource(@Qualifier("dataSource") DataSource dataSource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
        this.officeInsert = new SimpleJdbcInsert(dataSource)
                .withTableName("offices")
                .usingGeneratedKeyColumns("id");
        officeWithDetailExtractor = new OfficeWithDetailExtractor();
    }

    @Override
    public Office create(Office office) {
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("name", office.getName())
                .addValue("address_id", Objects.isNull(office.getAddress()) ? null : office.getAddress().getId())
                .addValue("description", office.getDescription());
        Long id = officeInsert.executeAndReturnKey(parameterSource).longValue();
        office.setId(id);
        return office;
    }

    @Override
    public Office findById(Long id) {
        String findOfficeByIdQuery = queryService.getQuery("office.findById");
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("id", id);
        List <Office> offices = jdbcTemplate.query(findOfficeByIdQuery, parameterSource, officeWithDetailExtractor);
        return offices.isEmpty() ? null : offices.get(0);
    }

    @Override
    public boolean update(Office office) {
        String update = queryService.getQuery("office.update");
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("id", office.getId())
                .addValue("name", office.getName())
                .addValue("address_id", Objects.isNull(office.getAddress()) ? null : office.getAddress().getId())
                .addValue("description", office.getDescription());
        int updatedRows = jdbcTemplate.update(update, parameterSource);
        return updatedRows > 0;
    }

    @Override
    public boolean delete(Office office) {
        return delete(office.getId());
    }

    @Override
    public boolean delete(Long id) {
        String deleteById = queryService.getQuery("office.deleteById");
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("id", id);
        int deletedRows = jdbcTemplate.update(deleteById, parameterSource);
        return deletedRows > 0;
    }

    @Override
    public List <Office> findByName(String name) {
        String findOfficesByNameWithAddressQuery = queryService.getQuery("office.findByName.withAddress");
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("name", name);
        List<Office> offices = jdbcTemplate.query(findOfficesByNameWithAddressQuery, parameterSource, officeWithDetailExtractor);
        return offices;
    }

    @Override
    public List <Office> findByStreet(String street) {
        String findOfficesByStreetWithAddressQuery = queryService.getQuery("office.findByStreet.withAddress");
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("street", street);
        List<Office> offices = jdbcTemplate.query(findOfficesByStreetWithAddressQuery, parameterSource, officeWithDetailExtractor);
        return offices;
    }

    @Override
    public List <Office> findAllWithAddress() {
        String findOfficesWithAddressQuery = queryService.getQuery("office.find.withAddress");
        List<Office> offices = jdbcTemplate.query(findOfficesWithAddressQuery, officeWithDetailExtractor);
        return offices;
    }

    @Override
    public boolean createWithAddress(Office office) {
        String insertWithAddressQuery = queryService.getQuery("office.insert.withAddress");
        //Street, house, flat, floor when null?
        SqlParameterSource parameterSource = new MapSqlParameterSource()
                .addValue("name", office.getName())
                .addValue("description", office.getDescription())
                .addValue("street", Objects.isNull(office.getAddress()) ? null : office.getAddress().getStreet())
                .addValue("house", Objects.isNull(office.getAddress()) ? null : office.getAddress().getHouse())
                .addValue("flat", Objects.isNull(office.getAddress()) ? null : office.getAddress().getFlat())
                .addValue("floor", Objects.isNull(office.getAddress()) ? null : office.getAddress().getFloor());

        int insertedRows = jdbcTemplate.update(insertWithAddressQuery, parameterSource);
        return insertedRows == 1;
    }

    private final class OfficeWithDetailExtractor implements ResultSetExtractor <List <Office>> {

        @Override
        public List <Office> extractData(ResultSet rs) throws SQLException, DataAccessException {
            List <Office> offices = new ArrayList <>();
            while (rs.next()) {
                Office office = new RealOffice();
                office.setId(rs.getLong("id"));
                office.setName(rs.getString("name"));
                office.setDescription(rs.getString("description"));

                Long addressId = rs.getLong("address_id");
                if (addressId != 0) {
                    Address address = new ProxyAddress(addressDao);
                    address.setId(addressId);
                    office.setAddress(address);
                }

                offices.add(office);
            }
            return offices;
        }
    }
}