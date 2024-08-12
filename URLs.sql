DROP database IF EXISTS Shortener;
create database Shortener;
use Shortener;
create table Users (
UserID int not null auto_increment primary key,
Username varchar(20) not null,
Email varchar(30) not null,
Upassword varchar(200) not null
);

create table Url (
id int not null auto_increment primary key,
ShortURL varchar(10) ,
OldUrl varchar(400) not null,
UserID_Users int
);
SELECT OldUrl, ShortUrl FROM Url where UserID_Users = 1
