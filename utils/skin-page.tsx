import SkinViewport from 'components/SkinViewport';
import SkinData from 'data/SkinData';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

export type SkinPageProps = {
  skin: SkinData;
  prev?: SkinData;
  next?: SkinData;
};

export function createGetStaticProps(
  skins: SkinData[]
): GetStaticProps<SkinPageProps> {
  return ({ params }) => {
    const skinIndex = skins.findIndex((skin) => skin.id === Number(params?.id));
    const skin = skins[skinIndex];
    const prev = skins[skinIndex - 1] ?? null;
    const next = skins[skinIndex + 1] ?? null;
    return {
      props: {
        skin,
        prev,
        next,
      },
    };
  };
}

export function createGetStaticPaths(
  skins: SkinData[]
): GetStaticPaths<{ id: string }> {
  return () => ({
    paths: skins.map((skin) => ({
      params: {
        id: String(skin.id),
      },
    })),
    fallback: false,
  });
}

export type CreateSkinPageOptions = {
  getSkinUrl: (skin: SkinData) => string;
};

export function createSkinPage({ getSkinUrl }: CreateSkinPageOptions) {
  return function SkinPage({ prev, next, skin }: SkinPageProps) {
    const router = useRouter();
    return (
      <>
        <Head>
          <title>
            {skin.model} ({skin.id})
          </title>
        </Head>
        <SkinViewport
          key={skin.id}
          onPrev={prev ? () => router.push(getSkinUrl(prev)) : undefined}
          onNext={next ? () => router.push(getSkinUrl(next)) : undefined}
          skin={skin}
        />
      </>
    );
  };
}
