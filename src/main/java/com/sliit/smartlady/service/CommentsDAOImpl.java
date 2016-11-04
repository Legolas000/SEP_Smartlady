package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Category;
import com.sliit.smartlady.model.Comments;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Fazeel on 11/4/2016.
 */
public class CommentsDAOImpl implements CommentsDAO {

    private JdbcTemplate jdbcTemplate;

    public CommentsDAOImpl(DataSource datasource)
    {
        jdbcTemplate = new JdbcTemplate(datasource);
    }

    @Override
    public List<Comments> getReaderCommentsByArticleID(int articleID) {
        String sql = "SELECT * FROM comments WHERE articleID = " + articleID;

        List<Comments> listComments = jdbcTemplate.query(sql, new RowMapper<Comments>() {

            @Override
            public Comments mapRow(ResultSet rs, int rowNum) throws SQLException {

                Comments lComments = new Comments();

                lComments.setId(rs.getInt("id"));
                lComments.setUserID(rs.getInt("userID"));
                lComments.setArticleID(rs.getInt("articleID"));
                lComments.setComments(rs.getString("comments"));
                lComments.setDateTime(rs.getString("dateTime"));

                return lComments;
            }
        });

        return listComments;
    }

    @Override
    public void saveUserComments(Comments comments) {
        try{
            String sql = "INSERT INTO comments(comments,dateTime, userID, articleID) " +
                    "VALUES (?,NOW(),?,?)";
            jdbcTemplate.update(sql,
                    comments.getComments(),
                    comments.getUserID(),
                    comments.getArticleID()
            );
        }catch (Exception ex){
            System.out.println("Exception : "+ ex);
        }
    }

    @Override
    public List<Comments> getAllCommentsOrderByDateTime() {
        String sql = "SELECT * FROM comments ORDER BY dateTime DESC";

        List<Comments> listComments = jdbcTemplate.query(sql, new RowMapper<Comments>() {

            @Override
            public Comments mapRow(ResultSet rs, int rowNum) throws SQLException {

                Comments lComments = new Comments();

                lComments.setId(rs.getInt("id"));
                lComments.setDateTime(rs.getString("dateTime"));
                lComments.setUserID(rs.getInt("userID"));
                lComments.setArticleID(rs.getInt("articleID"));
                lComments.setComments(rs.getString("comments"));

                return lComments;
            }
        });

        return listComments;
    }
}
