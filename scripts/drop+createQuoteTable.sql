USE [quotejoli]
GO

ALTER TABLE [dbo].[Quote] DROP CONSTRAINT [FK_Quote_Source]
GO

/****** Object:  Table [dbo].[Quote]    Script Date: 1/25/2017 4:41:16 PM ******/
DROP TABLE [dbo].[Quote]
GO

/****** Object:  Table [dbo].[Quote]    Script Date: 1/25/2017 4:41:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Quote](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sourceId] [int] NOT NULL,
	[text] [varchar](max) NOT NULL,
	[page] [int] NOT NULL,
	[para] [int] NULL,
 CONSTRAINT [PK_Quote] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Quote]  WITH CHECK ADD  CONSTRAINT [FK_Quote_Source] FOREIGN KEY([sourceId])
REFERENCES [dbo].[Source] ([id])
GO

ALTER TABLE [dbo].[Quote] CHECK CONSTRAINT [FK_Quote_Source]
GO

