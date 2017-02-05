USE [quotejoli]
GO

ALTER TABLE [dbo].[SourceAuthor] DROP CONSTRAINT [FK_SourceAuthor_Source]
GO

ALTER TABLE [dbo].[SourceAuthor] DROP CONSTRAINT [FK_SourceAuthor_Author]
GO

/****** Object:  Table [dbo].[SourceAuthor]    Script Date: 1/25/2017 4:45:08 PM ******/
DROP TABLE [dbo].[SourceAuthor]
GO

/****** Object:  Table [dbo].[SourceAuthor]    Script Date: 1/25/2017 4:45:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SourceAuthor](
	[id] [int] NOT NULL,
	[sourceId] [int] NOT NULL,
	[authorId] [int] NOT NULL,
 CONSTRAINT [PK_SourceAuthor] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[SourceAuthor]  WITH CHECK ADD  CONSTRAINT [FK_SourceAuthor_Author] FOREIGN KEY([authorId])
REFERENCES [dbo].[Author] ([id])
GO

ALTER TABLE [dbo].[SourceAuthor] CHECK CONSTRAINT [FK_SourceAuthor_Author]
GO

ALTER TABLE [dbo].[SourceAuthor]  WITH CHECK ADD  CONSTRAINT [FK_SourceAuthor_Source] FOREIGN KEY([sourceId])
REFERENCES [dbo].[Source] ([id])
GO

ALTER TABLE [dbo].[SourceAuthor] CHECK CONSTRAINT [FK_SourceAuthor_Source]
GO

