package com.sliit.smartlady.service;

import com.sliit.smartlady.model.Article;
import com.sliit.smartlady.model.Comments;

import java.util.List;

/**
 * Created by Fazeel on 11/4/2016.
 */
public interface CommentsDAO {
    List<Comments> getReaderCommentsByArticleID(int articleID);
    List<Comments> getAllCommentsOrderByDateTime();
    void saveUserComments(Comments comments);
}
