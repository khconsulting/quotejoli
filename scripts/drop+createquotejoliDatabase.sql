USE [master]
GO

/****** Object:  Database [quotejoli]    Script Date: 1/25/2017 4:46:15 PM ******/
DROP DATABASE [quotejoli]
GO

/****** Object:  Database [quotejoli]    Script Date: 1/25/2017 4:46:15 PM ******/
CREATE DATABASE [quotejoli]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'quotejoli', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MUNINN\MSSQL\DATA\quotejoli.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'quotejoli_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MUNINN\MSSQL\DATA\quotejoli_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO

ALTER DATABASE [quotejoli] SET COMPATIBILITY_LEVEL = 130
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [quotejoli].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [quotejoli] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [quotejoli] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [quotejoli] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [quotejoli] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [quotejoli] SET ARITHABORT OFF 
GO

ALTER DATABASE [quotejoli] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [quotejoli] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [quotejoli] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [quotejoli] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [quotejoli] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [quotejoli] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [quotejoli] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [quotejoli] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [quotejoli] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [quotejoli] SET  DISABLE_BROKER 
GO

ALTER DATABASE [quotejoli] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [quotejoli] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [quotejoli] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [quotejoli] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [quotejoli] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [quotejoli] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [quotejoli] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [quotejoli] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [quotejoli] SET  MULTI_USER 
GO

ALTER DATABASE [quotejoli] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [quotejoli] SET DB_CHAINING OFF 
GO

ALTER DATABASE [quotejoli] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [quotejoli] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [quotejoli] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [quotejoli] SET QUERY_STORE = OFF
GO

USE [quotejoli]
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO

ALTER DATABASE [quotejoli] SET  READ_WRITE 
GO

