﻿(function($,document){var data={};function getPageData(){var key=getSavedQueryKey();var pageData=data[key];if(!pageData){pageData=data[key]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"Playlist",Recursive:true,Fields:"PrimaryImageAspectRatio,SortName,CumulativeRunTimeTicks,CanDelete,SyncInfo",StartIndex:0,Limit:LibraryBrowser.getDefaultPageSize()},view:LibraryBrowser.getSavedView(key)||LibraryBrowser.getDefaultItemsView('Poster','Poster')};pageData.query.ParentId=LibraryMenu.getTopParentId();LibraryBrowser.loadSavedQueryValues(key,pageData.query);}
return pageData;}
function getQuery(){return getPageData().query;}
function getSavedQueryKey(){return getWindowUrl();}
function showLoadingMessage(page){Dashboard.showLoadingMsg();}
function hideLoadingMessage(page){Dashboard.hideLoadingMsg();}
function reloadItems(page){showLoadingMessage(page);var query=getQuery();var promise1=ApiClient.getItems(Dashboard.getCurrentUserId(),query);var promise2=Dashboard.getCurrentUser();$.when(promise1,promise2).done(function(response1,response2){var result=response1[0];var user=response2[0];window.scrollTo(0,0);var html='';var view=getPageData().view;$('.listTopPaging',page).html(LibraryBrowser.getQueryPagingHtml({startIndex:query.StartIndex,limit:query.Limit,totalRecordCount:result.TotalRecordCount,viewButton:false,showLimit:false,updatePageSizeSetting:false,addLayoutButton:true,currentLayout:view})).trigger('create');var trigger=false;if(result.TotalRecordCount){if(view=="List"){html=LibraryBrowser.getListViewHtml({items:result.Items,sortBy:query.SortBy});trigger=true;}
else if(view=="PosterCard"){html=LibraryBrowser.getPosterViewHtml({items:result.Items,shape:"square",showTitle:true,lazy:true,coverImage:true,showItemCounts:true,cardLayout:true});}
else if(view=="Poster"){html=LibraryBrowser.getPosterViewHtml({items:result.Items,shape:"square",showTitle:true,lazy:true,coverImage:true,showItemCounts:true,centerText:true,overlayPlayButton:true});}
else if(view=="Thumb"){html=LibraryBrowser.getPosterViewHtml({items:result.Items,shape:"backdrop",showTitle:true,centerText:true,lazy:true,preferThumb:true});}
else if(view=="ThumbCard"){html=LibraryBrowser.getPosterViewHtml({items:result.Items,shape:"backdrop",showTitle:true,lazy:true,preferThumb:true,cardLayout:true,showItemCounts:true});}
$('.noItemsMessage',page).hide();}else{$('.noItemsMessage',page).show();}
var elem=page.querySelector('.itemsContainer');elem.innerHTML=html;ImageLoader.lazyChildren(elem);if(trigger){$(elem).trigger('create');}
$('.btnNextPage',page).on('click',function(){query.StartIndex+=query.Limit;reloadItems(page);});$('.btnPreviousPage',page).on('click',function(){query.StartIndex-=query.Limit;reloadItems(page);});$('.btnChangeLayout',page).on('layoutchange',function(e,layout){getPageData().view=layout;LibraryBrowser.saveViewSetting(getSavedQueryKey(),layout);reloadItems(page);});LibraryBrowser.saveQueryValues(getSavedQueryKey(),query);hideLoadingMessage(page);});}
$(document).on('pagebeforeshow',"#playlistsPage",function(){var page=this;reloadItems(page);});})(jQuery,document);